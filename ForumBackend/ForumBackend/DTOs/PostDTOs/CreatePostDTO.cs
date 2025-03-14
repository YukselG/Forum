using ForumBackend.Models;
using System.ComponentModel.DataAnnotations;

namespace ForumBackend.DTOs.PostDTOs
{
    public class CreatePostDTO
    {
        [Required]
        [StringLength(300)]
        [MinLength(1)]
        public string Title { get; set; } = string.Empty;
        [Required]
        public string Description { get; set; } = string.Empty;
        [Required]
        public string UserId { get; set; } = string.Empty;
        //public DateTime DateOfCreation { get; set; } = DateTime.Now;
        public int CategoryId { get; set; }
    }
}
