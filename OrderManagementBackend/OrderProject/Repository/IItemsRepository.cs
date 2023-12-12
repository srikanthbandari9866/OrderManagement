using OrderManagement1.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OrderManagement1.Repository
{
    public interface IItemsRepository
    {
        //IEnumerable<Item> GetItemsList();
        Task<IEnumerable<Item>> GetItems();
        //Item GetItemById(int id)
        Task<Item> GetItemById(int id);
        //void UpdateItem(Item itm);
        Task<Item> UpdateItem(Item itm);
        //void AddItem(Item itm);
        Task<Item> AddItem(Item itm);
        Task<Item> DeleteItem(int id);
        List<Item> GetCategoryItems(int id);
    }
}
