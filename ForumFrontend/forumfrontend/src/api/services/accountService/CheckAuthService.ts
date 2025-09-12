import { log } from "console";
import { apiUrl } from "../../ApiURL";

export async function CheckUserAuth() {
	const response = await fetch(`${apiUrl}/account/check-auth`, {
		credentials: "include",
	});

	if (!response.ok) {
		throw new Error("Auth check not succesful");
	}

	// check if response has content
	const contentLength = response.headers.get("content-length");
	const contentType = response.headers.get("content-type");

	// below is for cookie-based login
	// status code 204 is No Content.
	if (response.status === 204 || !contentType || contentLength === "0") {
		return true; // Success, nothing else to process
	}

	// If Content-Type is JSON, parse it
	if (contentType.includes("application/json")) {
		const json = await response.json();
		return json;
	}
}
