using ForumBackend.Models;
using System.ComponentModel.DataAnnotations;

namespace ForumBackend.DTOs.PostDTO
{
    public class PostDTO
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string UserId { get; set; } = string.Empty;
        public DateTime DateOfCreation { get; set; } = DateTime.Now;
        public int NumberOfComments { get; set; }
        public int CategoryId { get; set; }


    }

    public class PostDTOById
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string UserId { get; set; } = string.Empty;
        public DateTime DateOfCreation { get; set; } = DateTime.Now;
        public int NumberOfComments { get; set; }
        public List<Comment> Comments { get; set; } = new List<Comment>();
        public int CategoryId { get; set; }
    }
}
