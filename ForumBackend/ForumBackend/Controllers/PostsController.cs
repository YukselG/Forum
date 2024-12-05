using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ForumBackend.Data;
using ForumBackend.Models;
using ForumBackend.Services.Interfaces;
using ForumBackend.DTOs.PostDTO;
using ForumBackend.Mappers;
using ForumBackend.DTOs.PostDTOs;
using Microsoft.AspNetCore.Authorization;

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
        public async Task<IActionResult> PutPost(int id, Post post)
        {
            if (id != post.Id)
            {
                return BadRequest();
            }

            try
            {
                await _postService.UpdatePostAsync(id, post);
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
        public async Task<ActionResult<CreatePostDTO>> PostPost(CreatePostDTO createPostDTO)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var createPost = createPostDTO.CreatePostDTOtoPost();
            await _postService.CreatePostAsync(createPost);

            return CreatedAtAction("GetPost", new { id = createPost.Id }, createPost);
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

            await _postService.DeletePostAsync(post);

            return NoContent();
        }

        private async Task<bool> PostExists(int id)
        {
            return await _postService.CheckIfPostExists(id);
        }
    }
}
