﻿using System;
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
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

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

            await _commentsService.DeleteCommentAsync(comment);

            return NoContent();
        }

        private async Task<bool> CommentExists(int id)
        {
            return await _commentsService.CheckIfCommentExists(id);
        }
    }
}
