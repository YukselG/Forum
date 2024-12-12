using Microsoft.AspNetCore.Identity;

namespace ForumBackend.Models
{
    public class Role : IdentityRole
    {
    }


    public static class RoleNames
    {
        public const string NormalUser = "NormalUser";
        public const string Admin = "Admin";
    }
}
