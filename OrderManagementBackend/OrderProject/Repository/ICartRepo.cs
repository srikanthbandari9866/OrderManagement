using OrderManagement1.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OrderManagement1.Repository
{
    public interface ICartRepo
    {
        Task<Cart> AddCart(Cart itm);
        Task<Cart> DeleteCart(int id);
        Task<Cart> GetCartById(int id);
        List<Cart> GetCartByUsersId(int id);
    }
}
