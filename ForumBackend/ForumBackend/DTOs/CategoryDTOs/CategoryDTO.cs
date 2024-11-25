using System.ComponentModel.DataAnnotations;

namespace ForumBackend.DTOs.CategoryDTOs
{
    public class CategoryDTO
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int NumberOfPosts { get; set; }
        public string UserId { get; set; } = string.Empty;
    }
}
