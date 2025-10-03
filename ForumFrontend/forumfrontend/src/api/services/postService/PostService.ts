import { CreatePostData, Post } from "../../../interfaces/Post";
import { apiUrl } from "../../ApiURL";

export async function GetAllPosts() {
	const response = await fetch(`${apiUrl}/Posts`);
	console.log(response);
	const data = await response.json();
	console.log(data);
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
