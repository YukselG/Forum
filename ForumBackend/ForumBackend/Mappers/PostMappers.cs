﻿using ForumBackend.DTOs.PostDTO;
using ForumBackend.DTOs.PostDTOs;
using ForumBackend.Models;
using Microsoft.Extensions.Hosting;

namespace ForumBackend.Mappers
{
    public static class PostMappers
    {
        public static PostDTO ToPostDTO (this Post post)
        {
            return new PostDTO
            {
                Id = post.Id,
                Title = post.Title,
                Description = post.Description,
                UserId = post.UserId,
                DateOfCreation = post.DateOfCreation,
                NumberOfComments = post.Comments.Count,
                CategoryId = post.CategoryId,
            };
        }

        public static Post CreatePostDTOtoPost (this CreatePostDTO createPostDTO, string userId)
        {
            return new Post
            {
                Title = createPostDTO.Title,
                Description = createPostDTO.Description,
                UserId = userId,
                DateOfCreation = DateTime.Now,
                CategoryId = createPostDTO.CategoryId,
            };
        }

        public static void UpdatePostDTOtoPost (this Post post, UpdatePostDTO updatePostDTO)
        {
            post.Title = updatePostDTO.Title;
            post.Description = updatePostDTO.Description;
        }
    }
}
