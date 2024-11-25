import { useLoaderData } from "react-router-dom";
import "./CategoryList.css";
import { Category as CategoryType } from "../../interfaces/Category";
import Category from "../category/Category";
import { GetAllCategories } from "../../api/services/categoryService/CategoryService";
import { useEffect } from "react";

const categoriesMock: CategoryType[] = [
	{
		id: 1,
		name: "Technology", // New name property
		description: "Technology - The latest trends in technology and innovation.", // Updated description
		numberOfPosts: 120,
	},
	{
		id: 2,
		name: "Health", // New name property
		description: "Health - Tips and information on how to stay healthy.", // Updated description
		numberOfPosts: 85,
	},
	{
		id: 3,
		name: "Travel", // New name property
		description: "Travel - Discover new destinations and travel tips.", // Updated description
		numberOfPosts: 45,
	},
	{
		id: 4,
		name: "Education", // New name property
		description: "Education - Insights on learning and development.", // Updated description
		numberOfPosts: 60,
	},
	{
		id: 5,
		name: "Food", // New name property
		description: "Food - Delicious recipes and food-related content.", // Updated description
		numberOfPosts: 100,
	},
	{
		id: 7,
		name: "Sports", // New name property
		description: "Sports - Updates on the latest sports news and events.", // Updated description
		numberOfPosts: 35,
	},
	{
		id: 8,
		name: "Investing", // New name property
		description: "Investing - Guides and tips on smart investing.", // Updated description
		numberOfPosts: 90,
	},
	{
		id: 9,
		name: "Hobbies", // New name property
		description: "Hobbies - Explore different hobbies and activities.", // Updated description
		numberOfPosts: 160,
	},
];

export default function CategoryList() {
	const { categories } = useLoaderData() as { categories: CategoryType[] };
	//useEffect(() => {}, []);

	// return (
	// 	<div className="categoryList">
	// 		<table>
	// 			<thead>
	// 				<tr>
	// 					<th className="th1">Id</th>
	// 					<th className="th2">Category</th>
	// 					<th className="th3">Posts</th>
	// 				</tr>
	// 			</thead>
	// 			<tbody>
	// 				{categories.map((category) => (
	// 					<Category key={category.id} category={category} />
	// 				))}
	// 			</tbody>
	// 		</table>
	// 	</div>
	// );

	return (
		<div className="container mt-4 ">
			<div className="table-responsive ">
				<table className="table table-hover table-bordered">
					<thead className="table-light">
						<tr>
							<th className="text-center hide-mobile">Id</th>
							<th>Category</th>
							<th className="text-center">Posts</th>
						</tr>
					</thead>
					<tbody>
						{categories.map((category) => (
							<Category key={category.id} category={category} />
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export async function loader() {
	const categories = await getCategories();
	return { categories };
}

async function getCategories() {
	const categories = await GetAllCategories();
	const categoriesMock = getCategoriesMock();

	return categories;
}

async function getCategoriesMock() {
	return categoriesMock;
}
