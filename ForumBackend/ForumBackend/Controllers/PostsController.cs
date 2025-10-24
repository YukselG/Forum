using ForumBackend.DTOs.PostDTO;
using ForumBackend.DTOs.PostDTOs;
using ForumBackend.Mappers;
using ForumBackend.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace ForumBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostsController : ControllerBase
    {
        //private readonly ForumContext _context;
        private readonly IPostsService _postService;

        public PostsController(IPostsService postService)
        {
            //_context = context;
            _postService = postService;
        }

        // GET: api/Posts
        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PostDTO>>> GetPosts()
        {
            var posts = await _postService.GetAllPostsAsync();
            var postsDTO = posts.Select(p => p.ToPostDTO());
            return Ok(postsDTO);
        }

        // GET: api/Posts/5
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<ActionResult<PostDTO>> GetPost(int id)
        {
            var post = await _postService.GetPostByIdAsync(id);

            if (post == null)
            {
                return NotFound();
            }

            var postDTO = post.ToPostDTO();

            return Ok(postDTO);
        }

        // PUT: api/Posts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPost(int id, UpdatePostDTO updatePostDTO)
        {
            if (id != updatePostDTO.Id)
            {
                return BadRequest();
            }

            // fetch the specific post
            var post = await _postService.GetPostByIdAsync(id);

            if (post == null)
            {
                return NotFound();
            }

            // get user to make sure only the owner of the post can edit it
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (post.UserId != userId)
            {
                return Forbid();
            }

            // update post values
            post.UpdatePostDTOtoPost(updatePostDTO);

            try
            {
                await _postService.UpdatePostAsync(post);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await PostExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Posts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PostDTO>> PostPost(CreatePostDTO createPostDTO)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId == null)
            {
                return Unauthorized();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var post = createPostDTO.CreatePostDTOtoPost(userId);
            await _postService.CreatePostAsync(post);

            var postDTO = post.ToPostDTO();

            return CreatedAtAction("GetPost", new { id = postDTO.Id }, postDTO);
        }

        // DELETE: api/Posts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePost(int id)
        {
            var post = await _postService.GetPostByIdAsync(id);
            if (post == null)
            {
                return NotFound();
            }

            // TODO: Should include admin role later as well
            // make sure user is the owner of the post before deleting
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (post.UserId != userId)
            {
                return Forbid();
            }

            await _postService.DeletePostAsync(post);

            return NoContent();
        }

        private async Task<bool> PostExists(int id)
        {
            return await _postService.CheckIfPostExists(id);
        }

        [AllowAnonymous]
        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<PostDTO>>> SearchPosts([FromQuery] string query)
        {
            if (string.IsNullOrWhiteSpace(query))
            {
                return BadRequest();
            }

            var queriedPosts = await _postService.SearchPostsAsync(query);

            var queriedPostsDTO = queriedPosts.Select(p => p.ToPostDTO());

            return Ok(queriedPostsDTO);
        }
    }
}
