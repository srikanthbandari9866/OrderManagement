using Microsoft.EntityFrameworkCore;
using OrderManagement1.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OrderManagement1.Repository
{
    public class OrderRepo : IOrderRepo
    {
        private readonly OrderContext _orderContext = null;
        public OrderRepo(OrderContext context) 
        {
            _orderContext = context;
        }
        public async Task<Order> AddOrder(Order itm)
        {
            var result = await _orderContext.Order.AddAsync(itm);
            await _orderContext.SaveChangesAsync();
            return result.Entity;
        }

        public async Task<Order> DeleteOrder(int id)
        {
            var result = await _orderContext.Order
                .FirstOrDefaultAsync(e => e.OrderId == id);
            if (result != null)
            {
                _orderContext.Order.Remove(result);
                await _orderContext.SaveChangesAsync();

            }
            return null;
        }

        public async Task<Order> GetOrderById(int id)
        {

            return await _orderContext.Order
               .FirstOrDefaultAsync(e => e.OrderId == id);
        }
        public List<Order> GetOrderByUserId(int id)
        {
            List<Order> list = new List<Order>();
            foreach (var item in _orderContext.Order)
            {
                if (item.UserId == id)
                {
                    list.Add(item);
                }
            }
            return list;

        }

        public async Task<IEnumerable<Order>> GetOrders()
        {
            return await _orderContext.Order.ToListAsync();
        }
        public async Task<Order> UpdateOrder(Order c)
        {
            var cat = await _orderContext.Order
                .FirstOrDefaultAsync(e => e.OrderId == c.OrderId);

            if (cat != null)
            {
                //cat.OrderNo = c.OrderNo;
                cat.OrderStatus = c.OrderStatus;
                //cat.OrderTotal = c.OrderTotal;
                _orderContext.Entry(cat).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                await _orderContext.SaveChangesAsync();

                return cat;
            }

            return null;
        }
    }
}
