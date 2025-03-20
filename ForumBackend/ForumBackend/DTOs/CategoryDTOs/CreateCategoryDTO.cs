using System.ComponentModel.DataAnnotations;

namespace ForumBackend.DTOs.CategoryDTOs
{
    public class CreateCategoryDTO
    {
        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;
        [Required]
        [StringLength(300)]
        public string Description { get; set; } = string.Empty;
        //public string UserId { get; set; } = string.Empty;
    }
}
