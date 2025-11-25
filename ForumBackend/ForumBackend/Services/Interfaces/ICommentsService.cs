using ForumBackend.Models;

namespace ForumBackend.Services.Interfaces
{
    public interface ICommentsService
    {
        Task<List<Comment>> GetAllCommentsAsync();
        Task<List<Comment>> GetAllCommentsFromPostAsync(int postId);
        Task<Comment?> GetCommentByIdAsync(int id);
        Task<Comment> CreateCommentAsync(Comment comment);
        Task UpdateCommentAsync(Comment comment);
        Task DeleteCommentAsync(Comment comment);
        Task<bool> CheckIfCommentExists(int id);
        Task<List<Comment>> SearchCommentsAsync(string query);
    }
}
