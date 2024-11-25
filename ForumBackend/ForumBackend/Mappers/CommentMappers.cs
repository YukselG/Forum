﻿using ForumBackend.DTOs.CommentDTO;
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

        public static Comment CreateCommentDTOtoComment (this CreateCommentDTO createCommentDTO)
        {
            return new Comment
            {
                Content = createCommentDTO.Content,
                UserId = createCommentDTO.UserId,
                DateOfCreation = createCommentDTO.DateOfCreation,
                PostId = createCommentDTO.PostId,
            };
        }
    }
}
