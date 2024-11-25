import { Link, useNavigate } from "react-router-dom";
import { Category as CategoryType } from "../../interfaces/Category";
import "./Category.css";

export default function Category({ category }: { category: CategoryType }) {
	// return (
	// 	<Link to={`/${category.id}/posts`}>
	// 		<tr className="categoryitem">
	// 			<td className="td1">{category.id}</td>
	// 			<td className="td2">{category.description}</td>
	// 			<td className="td3">{category.numberOfPosts}</td>
	// 		</tr>
	// 	</Link>
	// );

	const navigate = useNavigate();

	const handleRowClick = () => {
		navigate(`/${category.id}/posts`);
	};

	return (
		<tr className="clickable-row" onClick={handleRowClick}>
			<td className="text-center hide-mobile">{category.id}</td>
			<td>
				<div className="category-name">{category.name}</div>
				<div className="category-description">{category.description}</div>
			</td>
			<td className="text-center">{category.numberOfPosts}</td>
		</tr>
	);
}
