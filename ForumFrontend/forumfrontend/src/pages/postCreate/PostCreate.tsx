import { ActionFunctionArgs, Form, redirect } from "react-router-dom";
import "./PostCreate.css";
import { CreatePost } from "../../api/services/postService/PostService";
import { CreatePostData } from "../../interfaces/Post";
import { useState } from "react";

export default function PostCreate() {
	return (
		<div className="container mt-4 form-create">
			<Form method="post" id="create-post">
				<div className="mb-3">
					<label htmlFor="title" className="form-label">
						Title
					</label>
					<input
						type="text"
						id="title"
						name="title"
						className="form-control"
						placeholder="Enter the post title"
						required
						maxLength={300}
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="description" className="form-label">
						Description
					</label>
					<textarea
						name="description"
						id="description"
						rows={5}
						className="form-control"
						placeholder="Describe your post..."
						required
					></textarea>
				</div>
				<button type="submit" className="btn btn-success">
					Create Post!
				</button>
			</Form>
		</div>
	);
}

export async function action({ request, params }: ActionFunctionArgs) {
	const formData = await request.formData();

	const categoryId = params.categoryId ? parseInt(params.categoryId, 10) : undefined;

	// React Router's Params type allows for flexibility:
	// It means that params can contain multiple parameters, and any of them could be undefined.
	// This flexibility is necessary because not all routes will have the same parameters, so React Router can't assume the presence of categoryId or any other specific parameter.
	// Therefore, you need to check if params.categoryId exists within the function:
	if (!categoryId) {
		throw new Error("Category ID is required to create a post.");
	}

	const post: CreatePostData = {
		title: formData.get("title") as string,
		description: formData.get("description") as string,
		author: "Hans", //hardcoded at the moment
		categoryId: categoryId,
	};

	try {
		const createdPost = await CreatePost(post);
		//return { createdPost };
		return redirect(`/${categoryId}/posts/${createdPost.id}/comments`);
	} catch (error) {
		console.error("Failed to create post:", error);
		throw new Error("Post creation failed");
	}
}
