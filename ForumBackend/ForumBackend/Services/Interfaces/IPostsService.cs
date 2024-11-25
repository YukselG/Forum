using ForumBackend.Models;

namespace ForumBackend.Services.Interfaces
{
    public interface IPostsService
    {
        Task<List<Post>> GetAllPostsAsync();

        Task<Post?> GetPostByIdAsync(int id);

        Task<Post> CreatePostAsync(Post post);

        Task UpdatePostAsync(int id, Post post);

        Task DeletePostAsync(Post post);

        Task<bool> CheckIfPostExists(int id);
    }
}
