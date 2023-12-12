using Microsoft.EntityFrameworkCore;
using OrderManagement1.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OrderManagement1.Repository
{
    public class ItemsRepository : IItemsRepository
    {
        private readonly OrderContext _orderContext = null;
        public ItemsRepository(OrderContext orderContext)
        {
            _orderContext = orderContext;
        }

        //public void AddItem(Item itm)
        //{
        //    _orderContext.Add(itm);
        //    _orderContext.SaveChanges();
        //}
        public async Task<Item> AddItem(Item itm)
        {
            var result = await _orderContext.Item.AddAsync(itm);
            await _orderContext.SaveChangesAsync();
            return result.Entity;
        }

        //public void DeleteItem(int id)
        //{
        //    Item item = _orderContext.Item.Find(id);
        //    _orderContext.Remove(item);
        //    _orderContext.SaveChanges();
        //}
        public async Task<Item> DeleteItem(int id)
        {
            var result = await _orderContext.Item
                .FirstOrDefaultAsync(e => e.ItemId == id);
            if (result != null)
            {
                _orderContext.Item.Remove(result);
                await _orderContext.SaveChangesAsync();

            }
            return null;
        }

        public async Task<Item> GetItemById(int id)
        {
            //Item item = _orderContext.Item.Find(id);
            //return item;
            return await _orderContext.Item
               .FirstOrDefaultAsync(e => e.ItemId == id);
        }

        //public IEnumerable<Item> GetItemsList()
        //{
        //    return _orderContext.Item;
        //}
        public async Task<IEnumerable<Item>> GetItems()
        {
            return await _orderContext.Item.ToListAsync();
        }
        public List<Item> GetCategoryItems(int id)
        {
            List<Item> list = new List<Item>();
            foreach (var item in _orderContext.Item)
            {
                if(item.CategoryId == id)
                {
                    list.Add(item);
                }
            }
            return list;
          
        }
        public async Task<Item> UpdateItem(Item itm)
        {
            var item = await _orderContext.Item
                .FirstOrDefaultAsync(e => e.ItemId == itm.ItemId);

            if (item != null)
            {
                item.ItemName = itm.ItemName;
                item.Quantity = itm.Quantity;
                item.Price = itm.Price;
                item.ImagePath = itm.ImagePath;
                _orderContext.Entry(item).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                await _orderContext.SaveChangesAsync();

                return item;
            }

            return null;
        }

        //public void UpdateItem(Item itm)
        //{
        //    Item item = _orderContext.Item.Where(e => e.ItemId == itm.ItemId).FirstOrDefault();
        //    if(item != null)
        //    {
        //        item.ItemName = itm.ItemName;
        //        item.Quantity = itm.Quantity;
        //        item.Price = itm.Price;

        //    }
        //    _orderContext.Entry(item).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
        //    _orderContext.SaveChanges();
        //}
    }
}
