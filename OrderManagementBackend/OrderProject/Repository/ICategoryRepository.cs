using OrderManagement1.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OrderManagement1.Repository
{
   public interface ICategoryRepository
    {
        Task<IEnumerable<Category>> GetCategorys();      
        Task<Category> GetCategoryById(int id);       
        Task<Category> UpdateCategory(Category c);
        Task<Category> AddCategory(Category itm);
        Task<Category> DeleteCategory(int id);
    }
}
