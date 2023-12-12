using OrderManagement1.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OrderManagement1.Repository
{
    public interface IOrderRepo
    {
        Task<Order> AddOrder(Order itm);
        Task<Order> DeleteOrder(int id);
        Task<Order> GetOrderById(int id);
        List<Order> GetOrderByUserId(int id);
        Task<IEnumerable<Order>> GetOrders();
        Task<Order> UpdateOrder(Order c);
    }
}
