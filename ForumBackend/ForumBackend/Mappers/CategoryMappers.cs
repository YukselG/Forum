using ForumBackend.DTOs.CategoryDTOs;
using ForumBackend.Models;

namespace ForumBackend.Mappers
{
    public static class CategoryMappers
    {
        public static CategoryDTO ToCategoryDTO (this Category category)
        {
            return new CategoryDTO
            {
                Id = category.Id,
                Name = category.Name,
                Description = category.Description,
                NumberOfPosts = category.Posts.Count,
                UserId = category.UserId,
            };
        }
    }
}
