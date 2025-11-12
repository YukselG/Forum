using ForumBackend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;

namespace ForumBackend.Services.HelperServices
{
    public class CustomUserManager : UserManager<User>
    {
        private readonly RoleManager<Role> _roleManager;

        public CustomUserManager(
        IUserStore<User> store,
        IOptions<IdentityOptions> optionsAccessor,
        IPasswordHasher<User> passwordHasher,
        IEnumerable<IUserValidator<User>> userValidators,
        IEnumerable<IPasswordValidator<User>> passwordValidators,
        ILookupNormalizer keyNormalizer,
        IdentityErrorDescriber errors,
        IServiceProvider services,
        ILogger<UserManager<User>> logger,
        RoleManager<Role> roleManager)
        : base(store, optionsAccessor, passwordHasher, userValidators, passwordValidators, keyNormalizer, errors, services, logger)
        {
            _roleManager = roleManager;
        }

        public override async Task<IdentityResult> CreateAsync(User user, string password)
        {
            var result = await base.CreateAsync(user, password);

            // assign role to user
            if (result.Succeeded)
            {
                // Check if NormalUser role exists (it should, but just in case)
                if (!await _roleManager.RoleExistsAsync(RoleNames.NormalUser))
                {
                    await _roleManager.CreateAsync(new Role { Name = RoleNames.NormalUser });
                }

                await AddToRoleAsync(user, RoleNames.NormalUser);
            }

            return result;
        }
    }
}
