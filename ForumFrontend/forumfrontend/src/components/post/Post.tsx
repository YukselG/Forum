import { Post as PostType } from "../../interfaces/Post";
import { Link } from "react-router-dom";
import "./Post.css";
import { useAuth } from "../../context/authentication/AuthContext";
import { DeletePost } from "../../api/services/postService/PostService";

export default function Post({
	post,
	linkToComments = true,
	showActionButtons = false,
}: {
	post: PostType;
	linkToComments?: boolean;
	showActionButtons: boolean;
}) {
	const { isAuthenticated, user } = useAuth();

	async function handleDelete() {
		const confirmDeleletion = window.confirm("Are you sure you want to delete this post?");
		if (!confirmDeleletion) {
			return;
		}
		try {
			await DeletePost(post.id);
			window.location.reload(); // TODO: Probably find a better solution than just reloading whole page
		} catch (error) {
			console.error("error deleting post: ", error);
		}
	}

	async function handleEdit() {
		try {
			// TODO: Call update post service
		} catch (error) {
			console.error("error updating post: ", error);
		}
	}

	const postContent = (
		<div className="card mb-3" key={post.id}>
			<div className="card-body">
				<h5 className="card-title">{post.title}</h5>
				<p className="card-text">{post.description}</p>
				<p className="card-text">
					<small className="text-muted">Author: {post.author}</small>
				</p>
				<p className="card-text">
					<small className="text-muted">Created at: {new Date(post.dateOfCreation).toLocaleString()} </small>
				</p>

				{showActionButtons && isAuthenticated && user?.id === post.userId && (
					<div className="mt-2">
						<button onClick={handleEdit} className="btn btn-sm btn-warning me-2">
							Edit
						</button>
						<button onClick={handleDelete} className="btn btn-sm btn-danger">
							Delete
						</button>
					</div>
				)}
			</div>
		</div>
	);

	return linkToComments ? <Link to={`${post.id}/comments`}>{postContent}</Link> : postContent;
}
