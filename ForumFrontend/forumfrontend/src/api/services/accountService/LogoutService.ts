import { apiUrl } from "../../ApiURL";

export async function LogoutUser() {
	const response = await fetch(`${apiUrl}/account/logout`, {
		method: "POST",
		headers: {
			"Content-type": "application/json",
		},
		credentials: "include",
		body: JSON.stringify({}),
	});

	if (!response.ok) {
		throw new Error("Failed to logout. Response status: " + response.status);
	}

	// if backend is sending a response body
	const contentType = response.headers.get("content-type");
	// if json response body, make is js object and return
	if (contentType && contentType.includes("application/json")) {
		return await response.json();
	}

	// if no response body, return js object with message
	return { message: "Logged out succesfully" };
}
