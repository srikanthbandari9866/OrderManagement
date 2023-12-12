using OrderManagement1.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace OrderManagement1.Repository
{
    public interface ITempItemRepo
    {
        Task<TempItems> AddItem(TempItems itm);
        Task<TempItems> DeleteItem(int id);
        List<TempItems> GetItemsByUserId(int id);
        Task<IEnumerable<TempItems>> GetItems();
        Task<TempItems> GetItemById(int id);
    }
}
