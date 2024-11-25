using ForumBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace ForumBackend.Services.Interfaces
{
    public interface ICategoriesService
    {
        Task<List<Category>> GetAllCategoriesAsync();

        Task<Category?> GetCategoryByIdAsync(int id);

        Task<Category> CreateCategoryAsync(Category category);

        Task UpdateCategoryAsync(Category category);

        Task DeleteCategoryAsync(Category category);

        Task<bool> CheckIfCategoryExists(int id);
    }
}
