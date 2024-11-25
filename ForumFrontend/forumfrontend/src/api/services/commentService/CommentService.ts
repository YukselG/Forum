import { CreateCommentData } from "../../../interfaces/Comment";
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
	});

	if (!response.ok) {
		throw new Error("!Resonponse.ok: Failed to create comment", { cause: response.ok });
	}

	return response.json();
}
