import { apiUrl } from "../../ApiURL";

export async function SearchUsers(query: string) {
	const response = await fetch(`${apiUrl}/users/search?query=${query}`);
	const data = await response.json();

	return data;
}
