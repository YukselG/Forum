using ForumBackend.DTOs.CommentDTO;
using ForumBackend.Mappers;
using ForumBackend.Models;
using ForumBackend.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace ForumBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        //private readonly ForumContext _context;
        private readonly ICommentsService _commentsService;
        private readonly UserManager<User> _userManager;

        public CommentsController(ICommentsService commentsService, UserManager<User> userManager)
        {
            _commentsService = commentsService;
            _userManager = userManager;
        }

        // GET: api/Comments
        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CommentDTO>>> GetComments()
        {
            var comments = await _commentsService.GetAllCommentsAsync();
            var commentsDTO = comments.Select(c => c.ToCommentDTO());

            return Ok(commentsDTO);
        }

        // GET: api/Comments/5
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<ActionResult<CommentDTO>> GetComment(int id)
        {
            var comment = await _commentsService.GetCommentByIdAsync(id);

            if (comment == null)
            {
                return NotFound();
            }

            var commentDTO = comment.ToCommentDTO();

            return Ok(commentDTO);
        }

        // PUT: api/Comments/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutComment(int id, UpdateCommentDTO updateCommentDTO)
        {
            if (id != updateCommentDTO.Id)
            {
                return BadRequest();
            }

            // fetching the comment
            var comment = await _commentsService.GetCommentByIdAsync(id);

            if (comment == null)
            {
                return NotFound();
            }

            // get user to make sure only the owner of the comment can edit it
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (comment.UserId != userId)
            {
                return Forbid();
            }

            comment.UpdateCommentDTOtoComment(updateCommentDTO);

            try
            {
                await _commentsService.UpdateCommentAsync(comment);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await CommentExists(id))
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

        // POST: api/Comments
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CommentDTO>> PostComment(CreateCommentDTO createCommentDTO)
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

            var comment = createCommentDTO.CreateCommentDTOtoComment(userId);

            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return Unauthorized();
            }
            comment.User = user;

            await _commentsService.CreateCommentAsync(comment);

            var commentDTO = comment.ToCommentDTO();

            return CreatedAtAction("GetComment", new { id = commentDTO.Id }, commentDTO);
        }

        // DELETE: api/Comments/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteComment(int id)
        {
            var comment = await _commentsService.GetCommentByIdAsync(id);
            if (comment == null)
            {
                return NotFound();
            }


            // TODO: Should include admin role later as well
            // make sure user is the owner of the post before deleting
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (comment.UserId != userId)
            {
                return Forbid();
            }

            await _commentsService.DeleteCommentAsync(comment);

            return NoContent();
        }

        private async Task<bool> CommentExists(int id)
        {
            return await _commentsService.CheckIfCommentExists(id);
        }

        [AllowAnonymous]
        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<CommentDTO>>> SearchComments([FromQuery] string query)
        {
            if (string.IsNullOrWhiteSpace(query))
            {
                return BadRequest();
            }

            var queriedComments = await _commentsService.SearchCommentsAsync(query);

            var queriedCommentsDTO = queriedComments.Select(c => c.ToCommentDTO());

            return Ok(queriedCommentsDTO);
        }
    }
}
