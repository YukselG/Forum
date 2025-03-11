using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ForumBackend.Data;
using ForumBackend.Models;
using ForumBackend.Services.Interfaces;
using ForumBackend.Services.Implementations;
using ForumBackend.DTOs.CategoryDTOs;
using ForumBackend.Mappers;
using Microsoft.AspNetCore.Authorization;

namespace ForumBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        //private readonly ForumContext _context;
        private readonly ICategoriesService _categoriesService;

        public CategoriesController(ICategoriesService categoriesService)
        {
            //_context = context;
            _categoriesService = categoriesService;
        }

        // GET: api/Categories
        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategoryDTO >>> GetCategories()
        {
            // Using CategoryDTO to only return relevant data
            // BUT still calling the database for the whole table's data???
            var categories = await _categoriesService.GetAllCategoriesAsync();
            var categoriesDTO = categories.Select(c => c.ToCategoryDTO());
            return Ok(categoriesDTO);
        }

        // GET: api/Categories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CategoryDTO>> GetCategory(int id)
        {
            // Using CategoryDTO to only return relevant data
            // BUT still calling the database for the whole table's data???

            var category = await _categoriesService.GetCategoryByIdAsync(id);

            if (category == null)
            {
                return NotFound();
            }

            var categoryDTO = category.ToCategoryDTO();

            return Ok(categoryDTO);
        }

        // PUT: api/Categories/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCategory(int id, UpdateCategoryDTO updateCategoryDTO)
        {
            if (id != updateCategoryDTO.Id)
            {
                return BadRequest();
            }

            // fetching the category
            var category = await _categoriesService.GetCategoryByIdAsync(id);

            if(category == null)
            {
                return NotFound();
            }

            // update category properties
            category.UpdateCategoryDTOtoCategory(updateCategoryDTO);

            try
            {
                await _categoriesService.UpdateCategoryAsync(category);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await CategoryExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Categories
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult<CategoryDTO>> PostCategory(CreateCategoryDTO createCategoryDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var category = createCategoryDTO.CreateCategoryDTOtoCategory();

            await _categoriesService.CreateCategoryAsync(category);

            var categoryDTO = category.ToCategoryDTO();

            return CreatedAtAction("GetCategory", new { id = category.Id }, categoryDTO);
        }

        // DELETE: api/Categories/5
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            var category = await _categoriesService.GetCategoryByIdAsync(id);
            if (category == null)
            {
                return NotFound();
            }

            await _categoriesService.DeleteCategoryAsync(category);

            return NoContent();
        }

        private async Task<bool> CategoryExists(int id)
        {
            return await _categoriesService.CheckIfCategoryExists(id);
        }
    }
}
