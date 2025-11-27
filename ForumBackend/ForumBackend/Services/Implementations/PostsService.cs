using ForumBackend.Data;
using ForumBackend.Models;
using ForumBackend.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ForumBackend.Services.Implementations
{
    public class PostsService : IPostsService
    {
        private readonly ForumContext _context;
        public PostsService(ForumContext context)
        {
            _context = context;
        }

        public async Task<List<Post>> GetAllPostsAsync()
        {
            return await _context.Posts.Include(p => p.User).Include(p => p.Comments).ToListAsync();
        }

        public async Task<List<Post>> GetAllPostsFromCategoryAsync(int categoryId)
        {
            return await _context.Posts.Where((p) => p.CategoryId == categoryId).Include((p) => p.User).Include((p) => p.Comments).ToListAsync();
        }

        public async Task<Post?> GetPostByIdAsync(int id)
        {
            return await _context.Posts.Include(p => p.User).Include(p => p.Comments).FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<Post> CreatePostAsync(Post post)
        {
            await _context.Posts.AddAsync(post);
            await _context.SaveChangesAsync();

            return post;
        }

        public async Task UpdatePostAsync(Post post)
        {
            _context.Entry(post).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeletePostAsync(Post post)
        {
            /*var post = await _context.Posts.FindAsync(id);

            if (post == null)
            {
                return;
            }*/

            _context.Remove(post);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> CheckIfPostExists(int id)
        {
            return await _context.Posts.AnyAsync(post => post.Id == id);
        }

        public async Task<List<Post>> SearchPostsAsync(string query)
        {

            var posts = await _context.Posts.Where(p => p.Title.Contains(query) || p.Description.Contains(query)).ToListAsync();

            return posts;
        }




        // below for baseservice
        /*protected override async Task<IEnumerable<Post>> GetAll()
        {
            return await _context.Posts.ToListAsync();
        }

        protected override async Task<Post?> Get(int id)
        {
            return await _context.Posts.FindAsync(id);
        }

        protected override async Task<Post> Create(Post entity)
        {
            await _context.Posts.AddAsync(entity);
            await _context.SaveChangesAsync();

            return entity;
        }

        protected override async Task Update(int id, Post entity)
        {
            _context.Entry(entity).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        protected override async Task Delete(int id)
        {
            var post = await _context.Posts.FindAsync(id);

            if (post == null)
            {
                return;
            }

            _context.Remove(post);
            await _context.SaveChangesAsync();
        }
        */

    }
}
