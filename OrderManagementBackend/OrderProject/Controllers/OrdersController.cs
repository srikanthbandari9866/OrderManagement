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
    public class OrdersController : ControllerBase
    {
        private readonly IOrderRepo _orderRepo;
        public OrdersController(IOrderRepo or)
        {
            _orderRepo = or;
        }
        [HttpGet]
        public async Task<ActionResult> GetOrders()
        {
            try
            {
                return Ok(await _orderRepo.GetOrders());
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error retrieving data from the database");
            }
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrdersById(int id)
        {
            try
            {
                var result = await _orderRepo.GetOrderById(id);

                if (result == null) return NotFound();

                return result;
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error retrieving data from the database");
            }
        }
        [HttpGet("User/{id}")]
        public ActionResult<IEnumerable<Order>> GetOrdersByUsersId(int id)
        {
            try
            {
                List<Order> result = _orderRepo.GetOrderByUserId(id);

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
        public async Task<ActionResult<Order>> CreateOrder(Order itm)
        {
            try
            {
                if (itm == null)
                    return BadRequest();

                var createdItem = await _orderRepo.AddOrder(itm);

                return CreatedAtAction(nameof(GetOrders),
                    new { id = createdItem.OrderId }, createdItem);

            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error creating new Order record");
            }
        }
        [HttpPut("{id}")]
        public async Task<ActionResult<Order>> UpdateOrders(int id, Order itm)
        {
            try
            {
                if (id != itm.OrderId)
                    return BadRequest("Order ID mismatch");

                var item = await _orderRepo.GetOrderById(id);

                if (item == null)
                    return NotFound($"Order with Id = {id} not found");

                return await _orderRepo.UpdateOrder(itm);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error updating data");
            }
        }
        [HttpDelete("delete/{id}")]
        public async Task<ActionResult<Order>> DeleteOrders(int id)
        {
            try
            {
                var item = await _orderRepo.GetOrderById(id);

                if (item == null)
                {
                    return NotFound($"Order with Id = {id} not found");
                }

                return await _orderRepo.DeleteOrder(id);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error deleting data");
            }
        }
    }
}