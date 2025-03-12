using ForumBackend.Models;
using System.ComponentModel.DataAnnotations;

namespace ForumBackend.DTOs.PostDTOs
{
    public class UpdatePostDTO
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
    }
}