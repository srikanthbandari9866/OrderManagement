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
    public class OrderItemsController : ControllerBase
    {
        private readonly IOrderItemRepo _orderItemRepo;
        public OrderItemsController(IOrderItemRepo or)
        {
            _orderItemRepo = or;
        }
        [HttpGet]
        public async Task<ActionResult> GetOrderItems()
        {
            try
            {
                return Ok(await _orderItemRepo.GetOrderItems());
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error retrieving data from the database");
            }
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<OrderItem>> GetOrderItemsById(int id)
        {
            try
            {
                var result = await _orderItemRepo.GetOrderItemById(id);

                if (result == null) return NotFound();

                return result;
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error retrieving data from the database");
            }
        }
        [HttpGet("Order/{id}")]
        public ActionResult<IEnumerable<OrderItem>> GetOrderItemsByOrdersId(int id)
        {
            try
            {
                List<OrderItem> result = _orderItemRepo.GetOrderItemsByOrderId(id);

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
        public async Task<ActionResult<OrderItem>> CreateOrderItem(OrderItem itm)
        {
            try
            {
                if (itm == null)
                    return BadRequest();

                var createdItem = await _orderItemRepo.AddOrderItem(itm);

                return CreatedAtAction(nameof(GetOrderItems),
                    new { id = createdItem.OrderItemId }, createdItem);

            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error creating new OrderItem record");
            }
        }
        [HttpPut("{id}")]
        public async Task<ActionResult<OrderItem>> UpdateOrderItems(int id, OrderItem itm)
        {
            try
            {
                if (id != itm.OrderItemId)
                    return BadRequest("OrderItem ID mismatch");

                var item = await _orderItemRepo.GetOrderItemById(id);

                if (item == null)
                    return NotFound($"OrderItem with Id = {id} not found");

                return await _orderItemRepo.UpdateOrderItem(itm);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error updating data");
            }
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<OrderItem>> DeleteOrderItems(int id)
        {
            try
            {
                var item = await _orderItemRepo.GetOrderItemById(id);

                if (item == null)
                {
                    return NotFound($"OrderItem with Id = {id} not found");
                }

                return await _orderItemRepo.DeleteOrderItem(id);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error deleting data");
            }
        }
    }
}