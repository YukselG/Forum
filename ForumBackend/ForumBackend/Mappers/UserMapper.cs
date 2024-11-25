using ForumBackend.DTOs.UserDTOs;
using ForumBackend.Models;

namespace ForumBackend.Mappers
{
    public static class UserMapper
    {
        public static UserDTO ToUserDTO (this User user)
        {
            return new UserDTO
            {
                Id = user.Id,
                UserName = user.UserName,
            };
        }
    }
}
