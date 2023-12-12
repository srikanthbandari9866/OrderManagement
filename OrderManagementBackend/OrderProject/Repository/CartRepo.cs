using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using OrderManagement1.Models;

namespace OrderManagement1.Repository
{
    public class CartRepo : ICartRepo
    {
        private readonly OrderContext _orderContext = null;
        public CartRepo(OrderContext orderContext)
        {
            _orderContext = orderContext;
        }
        public async Task<Cart> AddCart(Cart itm)
        {
            var result = await _orderContext.Cart.AddAsync(itm);
            await _orderContext.SaveChangesAsync();
            return result.Entity;
        }

        public async Task<Cart> DeleteCart(int id)
        {
            var result = await _orderContext.Cart
                .FirstOrDefaultAsync(e => e.CartId == id);
            if (result != null)
            {
                _orderContext.Cart.Remove(result);
                await _orderContext.SaveChangesAsync();

            }
            return null;
        }

        public async Task<Cart> GetCartById(int id)
        {

            return await _orderContext.Cart
               .FirstOrDefaultAsync(e => e.CartId == id);
        }
        public List<Cart> GetCartByUsersId(int id)
        {
            List<Cart> list = new List<Cart>();
            foreach (var item in _orderContext.Cart)
            {
                if (item.UserId == id)
                {
                    list.Add(item);
                }
            }
            return list;
        }
    }   
}
