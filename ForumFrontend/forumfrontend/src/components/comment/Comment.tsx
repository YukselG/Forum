import { DeleteComment } from "../../api/services/commentService/CommentService";
import { useAuth } from "../../context/authentication/AuthContext";
import { Comment as CommentType } from "../../interfaces/Comment";
import "./Comment.css";

export default function Comment({ comment }: { comment: CommentType }) {
	const { isAuthenticated, user } = useAuth();

	async function handleDelete() {
		const confirmDeletion = window.confirm("Are you sure you want to delete this comment?");
		if (!confirmDeletion) {
			return;
		}
		try {
			await DeleteComment(comment.id);
			window.location.reload();
		} catch (error) {
			console.error("failed to delete comment: ", error);
		}
	}

	return (
		<div className="card">
			<div className="card-body">
				<p className="card-text">{comment.content}</p>
				<p className="card-author">By: {comment.author}</p>
				<p className="card-date text-muted">Commented at: {new Date(comment.dateOfCreation).toLocaleString()}</p>

				{isAuthenticated && user?.id == comment.userId && (
					<div className="mt-2">
						<button className="btn btn-sm btn-warning me-2">Edit</button>
						<button className="btn btn-sm btn-danger" onClick={handleDelete}>
							Delete
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
