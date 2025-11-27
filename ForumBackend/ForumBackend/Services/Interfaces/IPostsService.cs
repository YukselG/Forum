using ForumBackend.Models;

namespace ForumBackend.Services.Interfaces
{
    public interface IPostsService
    {
        Task<List<Post>> GetAllPostsAsync();
        Task<List<Post>> GetAllPostsFromCategoryAsync(int categoryId);

        Task<Post?> GetPostByIdAsync(int id);

        Task<Post> CreatePostAsync(Post post);

        Task UpdatePostAsync(Post post);

        Task DeletePostAsync(Post post);

        Task<bool> CheckIfPostExists(int id);

        Task<List<Post>> SearchPostsAsync(string query);
    }
}
