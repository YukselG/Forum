import { apiUrl } from "../../ApiURL";

export async function GetAllCategories() {
	const response = await fetch(`${apiUrl}/Categories`);
	console.log(response);
	const data = await response.json();
	console.log(data);

	return data;
}

export async function GetCategoryById(id: Number) {
	const response = await fetch(`${apiUrl}/Categories/${id}`);
	const data = await response.json();

	return data;
}
