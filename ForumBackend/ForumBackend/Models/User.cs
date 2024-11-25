using Microsoft.AspNetCore.Identity;

namespace ForumBackend.Models
{
    public class User : IdentityUser
    {
        public List<Category> Categories { get; set; } = new List<Category>();
        public List<Post> Posts { get; set; } = new List<Post>();
        public List<Comment> Comments { get; set; } = new List<Comment>();
    }
}
