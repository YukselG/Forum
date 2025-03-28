﻿using ForumBackend.DTOs.CategoryDTOs;
using ForumBackend.Models;
using System.ComponentModel.DataAnnotations;

namespace ForumBackend.Mappers
{
    public static class CategoryMappers
    {
        public static CategoryDTO ToCategoryDTO (this Category category)
        {
            return new CategoryDTO
            {
                Id = category.Id,
                Name = category.Name,
                Description = category.Description,
                NumberOfPosts = category.Posts.Count,
                UserId = category.UserId,
            };
        }

        public static Category CreateCategoryDTOtoCategory (this CreateCategoryDTO createCategoryDTO, string userId)
        {
            return new Category
            {
                Name = createCategoryDTO.Name,
                Description = createCategoryDTO.Description,
                UserId = userId,
            };
        }

        public static void UpdateCategoryDTOtoCategory (this Category category, UpdateCategoryDTO updateCategoryDTO)
        {
            category.Name = updateCategoryDTO.Name;
            category.Description = updateCategoryDTO.Description;
        }
    }
}