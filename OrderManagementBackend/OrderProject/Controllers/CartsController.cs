using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OrderManagement1.Models;
using OrderManagement1.Repository;

namespace OrderManagement1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartsController : ControllerBase
    {
        private readonly ICartRepo _cartRepo;
        public CartsController(ICartRepo cartRepo)
        {
            _cartRepo = cartRepo;
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Cart>> GetCartsById(int id)
        {
            try
            {
                var result = await _cartRepo.GetCartById(id);

                if (result == null) return NotFound();

                return result;
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error retrieving data from the database");
            }
        }
        [HttpGet("Users/{id}")]
        public ActionResult<IEnumerable<Cart>> GetUserCartsById(int id)
        {
            try
            {
                List<Cart> result = _cartRepo.GetCartByUsersId(id);

                if (result == null) return NotFound();

                return result;
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error retrieving data from the database");
            }
        }
        [HttpPost]
        public async Task<ActionResult<Cart>> CreateCart(Cart itm)
        {
            try
            {
                if (itm == null)
                    return BadRequest();

                var createdItem = await _cartRepo.AddCart(itm);

                return CreatedAtAction(nameof(CreateCart),
                    new { id = createdItem.CartId }, createdItem);

            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error creating new Cart record");
            }
        }
        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult<Cart>> DeleteCarts(int id)
        {
            try
            {
                var item = await _cartRepo.GetCartById(id);

                if (item == null)
                {
                    return NotFound($"Cart with Id = {id} not found");
                }

                return await _cartRepo.DeleteCart(id);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error deleting data");
            }
        }
    }
}