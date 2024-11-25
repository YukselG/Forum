using ForumBackend.Data;
using ForumBackend.Models;
using ForumBackend.Services.Interfaces;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;

namespace ForumBackend.Services.Implementations
{
    public class CategoriesService : ICategoriesService
    {
        private readonly ForumContext _context;
        public CategoriesService(ForumContext context)
        {
            _context = context;
        }

        public async Task<List<Category>> GetAllCategoriesAsync()
        {
            // Including the posts, so I can count the number of posts in the 
            return await _context.Categories.Include(c=>c.Posts).ToListAsync();
        }

        public async Task<Category?> GetCategoryByIdAsync(int id)
        {
            return await _context.Categories.FindAsync(id);
        }

        public async Task<Category> CreateCategoryAsync(Category category)
        {
            await _context.Categories.AddAsync(category);
            await _context.SaveChangesAsync();

            return category;

        }

        public async Task UpdateCategoryAsync(Category category)
        {
            _context.Entry(category).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteCategoryAsync(Category category)
        {
            /*var category = await _context.Categories.FirstOrDefaultAsync(c => c.Id == id);

            if (category == null)
            {
                return;
            }*/

            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> CheckIfCategoryExists(int id)
        {
            return await _context.Categories.AnyAsync(category => category.Id == id);
        }
    }
}