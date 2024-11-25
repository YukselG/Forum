using ForumBackend.DTOs.UserDTOs;
using ForumBackend.Mappers;
using ForumBackend.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ForumBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDTO>>> GetUsers()
        {
            var users = await _userService.GetAllUsersAsync();
            var usersDTO = users.Select(u => u.ToUserDTO());
            return Ok(usersDTO);
        }

        [HttpGet("id")]
        public async Task<ActionResult<UserDTO>> GetUser(string id)
        {
            var user = await _userService.GetUserByIdAsync(id);
            
            if (user == null)
            {
                return NotFound();
            }

            var userDTO = user.ToUserDTO();
            
            return Ok(userDTO);
        }

        [HttpDelete("id")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var user = await _userService.GetUserByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            await _userService.DeleteUserAndContentAsync(user);

            return NoContent(); 
        }
    }
}
