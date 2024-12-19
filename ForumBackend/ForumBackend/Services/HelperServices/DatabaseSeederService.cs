using ForumBackend.Models;
using Microsoft.AspNetCore.Identity;

namespace ForumBackend.Services.HelperServices
{
    public class DatabaseSeederService
    {
        private readonly RoleManager<Role> _roleManager;

        public DatabaseSeederService(RoleManager<Role> roleManager)
        {
            _roleManager = roleManager;
        }

        // seeding the two roles: Admin and NormalUser
        public async Task SeedRolesAsync()
        {
            if (!await _roleManager.RoleExistsAsync(RoleNames.Admin))
            {
                await _roleManager.CreateAsync(new Role { Name = RoleNames.Admin });
            }

            if (!await _roleManager.RoleExistsAsync(RoleNames.NormalUser))
            {
                await _roleManager.CreateAsync(new Role { Name = RoleNames.NormalUser });
            }
        }
    }
}
