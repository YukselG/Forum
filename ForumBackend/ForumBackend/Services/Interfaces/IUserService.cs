using ForumBackend.Models;

namespace ForumBackend.Services.Interfaces
{
    public interface IUserService
    {
        Task<List<User>> GetAllUsersAsync();
        Task<User?> GetUserByIdAsync(string id);
        Task DeleteUserAndContentAsync(User user);
    }
}
