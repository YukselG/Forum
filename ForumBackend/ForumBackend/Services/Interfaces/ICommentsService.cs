using ForumBackend.Models;

namespace ForumBackend.Services.Interfaces
{
    public interface ICommentsService
    {
        Task<List<Comment>> GetAllCommentsAsync();
        Task<Comment?> GetCommentByIdAsync(int id);
        Task<Comment> CreateCommentAsync(Comment comment);
        Task UpdateCommentAsync(Comment comment);
        Task DeleteCommentAsync(Comment comment);
        Task<bool> CheckIfCommentExists(int id);
    }
}
