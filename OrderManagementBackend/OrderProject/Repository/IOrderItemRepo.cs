using OrderManagement1.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OrderManagement1.Repository
{
    public interface IOrderItemRepo
    {
        Task<OrderItem> AddOrderItem(OrderItem itm);
        Task<OrderItem> DeleteOrderItem(int id);
        Task<OrderItem> GetOrderItemById(int id);
        Task<IEnumerable<OrderItem>> GetOrderItems();
        Task<OrderItem> UpdateOrderItem(OrderItem c);
        List<OrderItem> GetOrderItemsByOrderId(int id);
    }
}
