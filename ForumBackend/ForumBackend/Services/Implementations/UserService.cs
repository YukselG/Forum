using ForumBackend.Data;
using ForumBackend.Models;
using ForumBackend.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace ForumBackend.Services.Implementations
{
    public class UserService : IUserService
    {
        private readonly ForumContext _context;
        private readonly UserManager<User> _userManager;
        private readonly ILogger<UserService> _logger;
        public UserService(ForumContext context, UserManager<User> userManager, ILogger<UserService> logger)
        {
            _context = context;
            _userManager = userManager;
            _logger = logger;
        }

        public async Task<List<User>> GetAllUsersAsync()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<User?> GetUserByIdAsync(string id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task DeleteUserAndContentAsync(User user)
        {
            // Start a transaction to ensure atomicity
            using var transaction = await _context.Database.BeginTransactionAsync();

            try
            {
                // Deleting user's comments
                await _context.Comments.Where(c => c.UserId == user.Id).ExecuteDeleteAsync();

                // Deleting user's posts
                await _context.Posts.Where(p => p.UserId == user.Id).ExecuteDeleteAsync();

                // Deleting the user
                if (user != null)
                {
                    var result = await _userManager.DeleteAsync(user);
                    if (!result.Succeeded)
                    {
                        throw new Exception("Faild to delete user");
                    }
                }

                // Committing the transaction
                await transaction.CommitAsync();
                _logger.LogInformation($"User {user!.Id} and all associated content deleted successfully");
            }
            catch (Exception e)
            {
                // Rolling back the transaction if anything fails
                await transaction.RollbackAsync();
                _logger.LogError(e, $"Error deleting user {user.Id} and content");
                throw;
            }
        }

        public async Task<List<User>> SearchUsersAsync(string query)
        {
            var users = await _context.Users.Where(u => u.UserName.Contains(query)).ToListAsync();

            return users;
        }
    }
}
