using Microsoft.EntityFrameworkCore;
using OrderManagement1.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace OrderManagement1.Repository
{
    public class TempItemRepo : ITempItemRepo
    {
        private readonly OrderContext _orderContext = null;
        public TempItemRepo(OrderContext orderContext)
        {
            _orderContext = orderContext;
        }
        public async Task<IEnumerable<TempItems>> GetItems()
        {
            return await _orderContext.TempItems.ToListAsync();
        }
        public async Task<TempItems> GetItemById(int id)
        {
            //Item item = _orderContext.Item.Find(id);
            //return item;
            return await _orderContext.TempItems
               .FirstOrDefaultAsync(e => e.TempItemsId == id);
        }
        public async Task<TempItems> AddItem(TempItems itm)
        {
            var result = await _orderContext.TempItems.AddAsync(itm);
            await _orderContext.SaveChangesAsync();
            return result.Entity;
        }
        public async Task<TempItems> DeleteItem(int id)
        {
            var result = await _orderContext.TempItems
                .FirstOrDefaultAsync(e => e.TempItemsId == id);
            if (result != null)
            {
                _orderContext.TempItems.Remove(result);
                await _orderContext.SaveChangesAsync();

            }
            return null;
        }
        public List<TempItems> GetItemsByUserId(int id)
        {
            List<TempItems> list = new List<TempItems>();
            foreach (var item in _orderContext.TempItems)
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
