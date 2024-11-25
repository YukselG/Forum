import { Form, Link } from "react-router-dom";
import PostList from "../../components/posts/PostList";
import "./PostListPage.css";

export default function PostsPage() {
	return (
		<div className="container mt-4">
			<div className="mb-4">
				<PostList />
			</div>
			<div className="text-center">
				<Link to={`createPost`}>
					<button className="btn btn-primary">Create a new post!</button>
				</Link>
			</div>
		</div>
	);
}
