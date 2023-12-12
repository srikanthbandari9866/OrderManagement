using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using OrderManagement1.Models;

namespace OrderManagement1.Repository
{
    public class OrderItemRepo : IOrderItemRepo
    {
        private readonly OrderContext _orderContext = null;
        public OrderItemRepo(OrderContext order)
        {
            _orderContext = order;
        }
        public async Task<OrderItem> AddOrderItem(OrderItem itm)
        {
            var result = await _orderContext.OrderItem.AddAsync(itm);
            await _orderContext.SaveChangesAsync();
            return result.Entity;
        }

        public async Task<OrderItem> DeleteOrderItem(int id)
        {
            var result = await _orderContext.OrderItem
                .FirstOrDefaultAsync(e => e.OrderItemId == id);
            if (result != null)
            {
                _orderContext.OrderItem.Remove(result);
                await _orderContext.SaveChangesAsync();

            }
            return null;
        }

        public async Task<OrderItem> GetOrderItemById(int id)
        {

            return await _orderContext.OrderItem
               .FirstOrDefaultAsync(e => e.OrderItemId == id);
        }
        public List<OrderItem> GetOrderItemsByOrderId(int id)
        {
            List<OrderItem> list = new List<OrderItem>();
            foreach (var item in _orderContext.OrderItem)
            {
                if (item.OrderId == id)
                {
                    list.Add(item);
                }
            }
            return list;

        }

        public async Task<IEnumerable<OrderItem>> GetOrderItems()
        {
            return await _orderContext.OrderItem.ToListAsync();
        }
        public async Task<OrderItem> UpdateOrderItem(OrderItem c)
        {
            var cat = await _orderContext.OrderItem
                .FirstOrDefaultAsync(e => e.OrderItemId == c.OrderItemId);

            if (cat != null)
            {
                cat.ShippingAddress = c.ShippingAddress;
                cat.OrderStatus = c.OrderStatus;
                _orderContext.Entry(cat).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                await _orderContext.SaveChangesAsync();

                return cat;
            }

            return null;
        }
    }
}
