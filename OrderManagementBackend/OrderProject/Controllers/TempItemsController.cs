using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OrderManagement1.Models;
using OrderManagement1.Repository;
using System.Threading.Tasks;
using System;
using System.Collections.Generic;

namespace OrderProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TempItemsController : ControllerBase
    {
        private readonly ITempItemRepo _ordersRepository;
        public TempItemsController(ITempItemRepo ordersRepository)
        {
            _ordersRepository = ordersRepository;
        }
        [HttpGet]
        public async Task<ActionResult> GetItems()
        {
            try
            {
                return Ok(await _ordersRepository.GetItems());
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error retrieving data from the database");
            }
        }
        [HttpGet("User/{id}")]
        public ActionResult<IEnumerable<TempItems>> GetItemsByUsersId(int id)
        {
            try
            {
                List<TempItems> result = _ordersRepository.GetItemsByUserId(id);

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
        public async Task<ActionResult<TempItems>> CreateEmployee(TempItems itm)
        {
            try
            {
                if (itm == null)
                    return BadRequest();

                var createdItem = await _ordersRepository.AddItem(itm);

                return CreatedAtAction(nameof(GetItems),
                    new { id = createdItem.TempItemsId }, createdItem);

            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error creating new Item record");
            }
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<TempItems>> DeleteItems(int id)
        {
            try
            {
                var item = await _ordersRepository.GetItemById(id);

                if (item == null)
                {
                    return NotFound($"Item with Id = {id} not found");
                }

                return await _ordersRepository.DeleteItem(id);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error deleting data");
            }
        }
    }
}
