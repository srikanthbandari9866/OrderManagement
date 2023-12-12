using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OrderManagement1.Models;
using OrderManagement1.Repository;

namespace OrderManagement1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryRepository _categoryRepository;
        public CategoriesController(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        } 
        [HttpGet]
        public async Task<ActionResult> GetCategorys()
        {
            try
            {
                return Ok(await _categoryRepository.GetCategorys());
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error retrieving data from the database");
            }
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Category>> GetCategorysById(int id)
        {
            try
            {
                var result = await _categoryRepository.GetCategoryById(id);

                if (result == null) return NotFound();

                return result;
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error retrieving data from the database");
            }
        }
        //[HttpPost]
        //public async Task<ActionResult<Category>> CreateCategory(Category c)
        //{
        //    try
        //    {
        //        if (c == null)
        //            return BadRequest();

        //        var createdCategory = await _categoryRepository.AddCategory(c);

        //        return CreatedAtAction(nameof(CreateCategory),
        //            new { id = createdCategory.CategoryId }, createdCategory);

        //    }
        //    catch (Exception)
        //    {
        //        return StatusCode(StatusCodes.Status500InternalServerError,
        //            "Error creating new Category record");
        //    }
        //}
        [HttpPost]
        public async Task<ActionResult<Category>> CreateCategory(Category itm)
        {
            try
            {
                if (itm == null)
                    return BadRequest();

                var createdItem = await _categoryRepository.AddCategory(itm);

                return CreatedAtAction(nameof(GetCategorys),
                    new { id = createdItem.CategoryId }, createdItem);

            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error creating new Category record");
            }
        }
        [HttpPut("{id}")]
        public async Task<ActionResult<Category>> UpdateCategorys(int id, Category itm)
        {
            try
            {
                if (id != itm.CategoryId)
                    return BadRequest("Category ID mismatch");

                var item = await _categoryRepository.GetCategoryById(id);

                if (item == null)
                    return NotFound($"Category with Id = {id} not found");

                return await _categoryRepository.UpdateCategory(itm);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error updating data");
            }
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<Category>> DeleteCategorys(int id)
        {
            try
            {
                var item = await _categoryRepository.GetCategoryById(id);

                if (item == null)
                {
                    return NotFound($"Category with Id = {id} not found");
                }

                return await _categoryRepository.DeleteCategory(id);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error deleting data");
            }
        }
    }
}