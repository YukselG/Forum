using ForumBackend.DTOs.CommentDTO;
using ForumBackend.Models;

namespace ForumBackend.Mappers
{
    public static class CommentMappers
    {
        public static CommentDTO ToCommentDTO (this Comment comment)
        {
            return new CommentDTO
            {
                Id = comment.Id,
                Content = comment.Content,
                UserId = comment.UserId,
                DateOfCreation = comment.DateOfCreation,
                PostId = comment.PostId,
            };
        }

        public static Comment CreateCommentDTOtoComment (this CreateCommentDTO createCommentDTO, string userId)
        {
            return new Comment
            {
                Content = createCommentDTO.Content,
                UserId = userId,
                DateOfCreation = DateTime.Now,
                PostId = createCommentDTO.PostId,
            };
        }

        public static void UpdateCommentDTOtoComment (this Comment comment, UpdateCommentDTO updateCommentDTO)
        {
            comment.Content = updateCommentDTO.Content;
        }
    }
}
