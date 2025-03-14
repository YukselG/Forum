using ForumBackend.Models;

namespace ForumBackend.DTOs.CommentDTO
{
    public class CreateCommentDTO
    {
        public string Content { get; set; } = string.Empty;
        public string UserId { get; set; } = string.Empty;
        //public DateTime DateOfCreation { get; set; } = DateTime.Now;
        public int PostId { get; set; }
    }
}
