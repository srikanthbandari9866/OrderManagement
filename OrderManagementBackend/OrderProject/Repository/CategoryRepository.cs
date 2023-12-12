using Microsoft.EntityFrameworkCore;
using OrderManagement1.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OrderManagement1.Repository
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly OrderContext _orderContext = null;
        public CategoryRepository(OrderContext orderContext)
        {
            _orderContext = orderContext;
        }


        //public async Task<Category> AddCategory(Category c)
        //{
        //    var result = await _orderContext.Category.AddAsync(c);
        //    await _orderContext.SaveChangesAsync();
        //    return result.Entity;
        //}
        public async Task<Category> AddCategory(Category itm)
        {
            var result = await _orderContext.Category.AddAsync(itm);
            await _orderContext.SaveChangesAsync();
            return result.Entity;
        }

        public async Task<Category> DeleteCategory(int id)
        {
            var result = await _orderContext.Category
                .FirstOrDefaultAsync(e => e.CategoryId == id);
            if (result != null)
            {
                _orderContext.Category.Remove(result);
                await _orderContext.SaveChangesAsync();

            }
            return null;
        }

        public async Task<Category> GetCategoryById(int id)
        {
            
            return await _orderContext.Category
               .FirstOrDefaultAsync(e => e.CategoryId == id);
        }

        public async Task<IEnumerable<Category>> GetCategorys()
        {
            return await _orderContext.Category.ToListAsync();
        }
        public async Task<Category> UpdateCategory(Category c)
        {
            var cat = await _orderContext.Category
                .FirstOrDefaultAsync(e => e.CategoryId == c.CategoryId);

            if (cat != null)
            {
                cat.CategoryName = c.CategoryName;
                _orderContext.Entry(cat).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                await _orderContext.SaveChangesAsync();

                return cat;
            }

            return null;
        }
    }
}
