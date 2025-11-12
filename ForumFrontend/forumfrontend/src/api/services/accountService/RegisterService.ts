import { error } from "console";
import { RegisterModel } from "../../../interfaces/RegisterModel";
import { apiUrl } from "../../ApiURL";

export default async function RegisterUser(registerModel: RegisterModel) {
	const response = await fetch(`${apiUrl}/account/register`, {
		method: "POST",
		body: JSON.stringify(registerModel),
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		throw new Error("!Response.ok: Failed to register user");
	}

	return response.json();
}
