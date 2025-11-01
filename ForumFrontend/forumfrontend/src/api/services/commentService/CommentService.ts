import { CreateCommentData, UpdateCommentData } from "../../../interfaces/Comment";
import { apiUrl } from "../../ApiURL";

export default async function GetAllComments() {
	const response = await fetch(`${apiUrl}/Comments`);

	const data = await response.json();

	return data;
}

export async function GetCommentById(id: Number) {
	const response = await fetch(`${apiUrl}/Comments/${id}`);

	const data = await response.json();

	return data;
}

export async function CreateComment(comment: CreateCommentData) {
	const response = await fetch(`${apiUrl}/Comments`, {
		method: "POST",
		body: JSON.stringify(comment),
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
	});

	if (!response.ok) {
		throw new Error("!Resonponse.ok: Failed to create comment", { cause: response.ok });
	}

	return response.json();
}

export async function DeleteComment(id: number) {
	const response = await fetch(`${apiUrl}/comments/${id}`, {
		method: "DELETE",
		credentials: "include",
	});

	if (!response.ok) {
		throw new Error("!Resonponse.ok: Failed to delete comment");
	}

	return response.ok;
}

export async function UpdateComment(id: number, updatedComment: UpdateCommentData) {
	const response = await fetch(`${apiUrl}/comments/${id}`, {
		method: "PUT",
		body: JSON.stringify(updatedComment),
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
	});

	if (!response.ok) {
		throw new Error("!Resonponse.ok: Failed to update comment");
	}

	return response.ok;
}

export async function SearchComments(query: string) {
	const response = await fetch(`${apiUrl}/comments/search?query=${query}`);
	const data = await response.json();

	return data;
}
