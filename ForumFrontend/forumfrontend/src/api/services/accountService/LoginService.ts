import { error } from "console";
import { LoginCredentials } from "../../../interfaces/LoginCredentials";
import { apiUrl } from "../../ApiURL";

export async function LoginUser(loginCredentials: LoginCredentials) {
	const response = await fetch(`https://localhost:7056/login?useCookies=true`, {
		method: "POST",
		body: JSON.stringify(loginCredentials),
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
	});

	// Read response body safely
	let responseBody: string | undefined;
	try {
		responseBody = await response.text();
	} catch {
		responseBody = undefined;
	}

	if (!response.ok) {
		throw new Error(`Failed to login. \n Response body: \n ${responseBody}`);
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
		try {
			return JSON.parse(responseBody!);
		} catch {
			console.warn("Response not valid JSON:", responseBody);
			return responseBody;
		}
	}

	return responseBody;
}
