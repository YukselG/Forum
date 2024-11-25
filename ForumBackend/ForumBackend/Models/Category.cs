using System.ComponentModel.DataAnnotations;

namespace ForumBackend.Models
{
    public class Category
    {
        public int Id { get; set; }
        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;
        [Required]
        [StringLength(300)]
        public string Description { get; set; } = string.Empty;

        public List<Post> Posts { get; set; } = new List<Post>();

        public string UserId { get; set; } = string.Empty;
        public User User { get; set; } = null!;
    }
}
