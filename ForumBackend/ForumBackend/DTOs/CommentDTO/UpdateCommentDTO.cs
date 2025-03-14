namespace ForumBackend.DTOs.CommentDTO
{
    public class UpdateCommentDTO
    {
        public int Id { get; set; }
        public string Content { get; set; } = string.Empty;
    }
}
