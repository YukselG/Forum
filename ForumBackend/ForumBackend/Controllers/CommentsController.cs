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
using ForumBackend.DTOs.CommentDTO;
using ForumBackend.Mappers;

namespace ForumBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        //private readonly ForumContext _context;
        private readonly ICommentsService _commentsService;

        public CommentsController(ICommentsService commentsService)
        {
            _commentsService = commentsService;
        }

        // GET: api/Comments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CommentDTO>>> GetComments()
        {
            var comments = await _commentsService.GetAllCommentsAsync();
            var commentsDTO = comments.Select(c => c.ToCommentDTO());

            return Ok(commentsDTO);
        }

        // GET: api/Comments/5
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
        public async Task<IActionResult> PutComment(int id, Comment comment)
        {
            if (id != comment.Id)
            {
                return BadRequest();
            }

            try
            {
                await _commentsService.UpdateCommentAsync(id, comment);
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
        public async Task<ActionResult<CreateCommentDTO>> PostComment(CreateCommentDTO createCommentDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var createComment = createCommentDTO.CreateCommentDTOtoComment();
            await _commentsService.CreateCommentAsync(createComment);

            return CreatedAtAction("GetComment", new { id = createComment.Id }, createComment);
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

            await _commentsService.DeleteCommentAsync(comment);

            return NoContent();
        }

        private async Task<bool> CommentExists(int id)
        {
            return await _commentsService.CheckIfCommentExists(id);
        }
    }
}
