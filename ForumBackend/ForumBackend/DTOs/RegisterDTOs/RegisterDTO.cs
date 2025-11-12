using System.ComponentModel.DataAnnotations;

namespace ForumBackend.DTOs.RegisterDTO
{
    public class RegisterDTO
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
        [Required]
        public string Password { get; set; } = string.Empty;
        [Required]
        public string UserName { get; set; } = string.Empty;
    }
}
