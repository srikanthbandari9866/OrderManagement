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
    public class ItemsController : ControllerBase
    {
        private readonly IItemsRepository _ordersRepository;
        public ItemsController(IItemsRepository ordersRepository)
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
        [HttpGet("{id}")]
        public async Task<ActionResult<Item>> GetItemsById(int id)
        {
            try
            {
                var result = await _ordersRepository.GetItemById(id);

                if (result == null) return NotFound();

                return result;
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error retrieving data from the database");
            }
        }
        [HttpGet("Category/{id}")]
        public ActionResult<IEnumerable<Item>> GetCategoryItemsById(int id)
        {
            try
            {
               List<Item> result = _ordersRepository.GetCategoryItems(id);

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
        public async Task<ActionResult<Item>> CreateEmployee(Item itm)
        {
            try
            {
                if (itm == null)
                    return BadRequest();

                var createdItem = await _ordersRepository.AddItem(itm);

                return CreatedAtAction(nameof(GetItems),
                    new { id = createdItem.ItemId }, createdItem);

            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error creating new Item record");
            }
        }
        [HttpPut("{id}")]
        public async Task<ActionResult<Item>> UpdateItems(int id, Item itm)
        {
            try
            {
                if (id != itm.ItemId)
                    return BadRequest("Item ID mismatch");

                var item = await _ordersRepository.GetItemById(id);

                if (item == null)
                    return NotFound($"Item with Id = {id} not found");

                return await _ordersRepository.UpdateItem(itm);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error updating data");
            }
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<Item>> DeleteItems(int id)
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