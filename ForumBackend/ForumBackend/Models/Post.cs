using System.ComponentModel.DataAnnotations;

namespace ForumBackend.Models
{
    public class Post
    {
        public int Id { get; set; }
        [Required]
        [StringLength(300)]
        [MinLength(1)]
        public string Title { get; set; } = string.Empty;
        [Required]
        [MinLength(1)]
        public string Description { get; set; } = string.Empty;
        public DateTime DateOfCreation { get; set; } = DateTime.Now;
        public List<Comment> Comments { get; set; } = new List<Comment>();

        public int CategoryId { get; set; }
        public Category Category { get; set; } = null!;

        public string UserId { get; set; } = string.Empty;
        public User User { get; set; } = null!;
    }
}
