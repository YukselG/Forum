import { CreatePostData, Post, UpdatePostData } from "../../../interfaces/Post";
import { apiUrl } from "../../ApiURL";

export async function GetAllPosts() {
	const response = await fetch(`${apiUrl}/Posts`);
	const data = await response.json();

	return data;
}

export async function GetAllPostsFromCategory(id: Number) {
	const response = await fetch(`${apiUrl}/posts/categoryPosts/${id}`);
	const data = await response.json();

	return data;
}

export async function GetPostById(id: Number) {
	const response = await fetch(`${apiUrl}/Posts/${id}`);
	const data = await response.json();

	return data;
}

export async function CreatePost(post: CreatePostData) {
	const response = await fetch(`${apiUrl}/Posts`, {
		method: "POST",
		body: JSON.stringify(post),
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
	});

	if (!response.ok) {
		throw new Error("Failed to create post");
	}

	return response.json();
}

export async function DeletePost(id: Number) {
	const response = await fetch(`${apiUrl}/Posts/${id}`, {
		method: "DELETE",
		credentials: "include",
	});

	if (!response.ok) {
		throw new Error("!Resonponse.ok: Failed to delete comment");
	}

	return response.ok;
}

export async function UpdatePost(id: number, updatedPost: UpdatePostData) {
	const respose = await fetch(`${apiUrl}/Posts/${id}`, {
		method: "PUT",
		body: JSON.stringify(updatedPost),
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
	});

	if (!respose.ok) {
		throw new Error("!Response.ok: Failed to update post");
	}

	return respose.ok;
}

export async function SearchPosts(query: string) {
	const response = await fetch(`${apiUrl}/posts/search?query=${query}`);
	const data = await response.json();

	return data;
}
