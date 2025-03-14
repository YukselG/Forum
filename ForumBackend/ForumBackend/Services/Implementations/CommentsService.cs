using ForumBackend.Data;
using ForumBackend.Models;
using ForumBackend.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Xml.Linq;

namespace ForumBackend.Services.Implementations
{
    public class CommentsService : ICommentsService
    {
        private readonly ForumContext _context;
        public CommentsService(ForumContext context)
        {
            _context = context;    
        }
        public async Task<List<Comment>> GetAllCommentsAsync()
        {
            return await _context.Comments.ToListAsync();
        }

        public async Task<Comment?> GetCommentByIdAsync(int id)
        {
            return await _context.Comments.FindAsync(id);
        }

        public async Task<Comment> CreateCommentAsync(Comment comment)
        {
            await _context.Comments.AddAsync(comment);
            await _context.SaveChangesAsync();

            return comment;
        }

        public async Task UpdateCommentAsync(Comment comment)
        {
            _context.Entry(comment).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteCommentAsync(Comment comment)
        {
            _context.Comments.Remove(comment);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> CheckIfCommentExists(int id)
        {
            return await _context.Comments.AnyAsync(comment => comment.Id == id);
        }
    }
}
