using ForumBackend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace ForumBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly SignInManager<User> _signInManager;
        public AccountController(SignInManager<User> signInManager)
        {
            _signInManager = signInManager;
        }

        [HttpPost("logout")]
        [Authorize] // only authorized (logged in) users can call this endpoint
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync(); // remove cookie

            return Ok(new { message = "Logged out successfully" });
        }
    }
}
