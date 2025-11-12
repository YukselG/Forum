using ForumBackend.DTOs.RegisterDTO;
using ForumBackend.Models;

namespace ForumBackend.Mappers
{
    public static class RegisterMappers
    {
        public static User RegisterDTOtoUser(this RegisterDTO registerDTO)
        {
            return new User
            {
                Email = registerDTO.Email,
                UserName = registerDTO.UserName,
            };
        }
    }
}
