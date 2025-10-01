import { useState } from "react";
import { DeleteComment, UpdateComment } from "../../api/services/commentService/CommentService";
import { useAuth } from "../../context/authentication/AuthContext";
import { Comment as CommentType } from "../../interfaces/Comment";
import { UpdateCommentData } from "../../interfaces/Comment";
import "./Comment.css";

export default function Comment({ comment }: { comment: CommentType }) {
	const { isAuthenticated, user } = useAuth();
	const [editMode, setEditMode] = useState(false);
	const [editedContent, setEditedContent] = useState(comment.content);

	async function handleDelete() {
		const confirmDeletion = window.confirm("Are you sure you want to delete this comment?");
		if (!confirmDeletion) {
			return;
		}
		try {
			await DeleteComment(comment.id);
			window.location.reload(); // TODO: Probably find a better solution than just reloading whole page
		} catch (error) {
			console.error("failed to delete comment: ", error);
		}
	}

	async function handleSave() {
		const updatedComment: UpdateCommentData = {
			id: comment.id,
			content: editedContent,
		};

		try {
			await UpdateComment(comment.id, updatedComment);
			window.location.reload(); // TODO: Probably find a better solution than just reloading whole page
		} catch (error) {
			console.error("failed to update comment: ", error);
		}
	}

	return (
		<div className="card">
			<div className="card-body">
				{editMode ? (
					<>
						<textarea
							className="form-control mb-2"
							value={editedContent}
							onChange={(e) => setEditedContent(e.target.value)}
						></textarea>
						<button className="btn btn-sm btn-success me-2" onClick={handleSave}>
							Save
						</button>
						<button className="btn btn-sm btn-secondary" onClick={() => setEditMode(false)}>
							Cancel
						</button>
					</>
				) : (
					<>
						<p className="card-text">{comment.content}</p>
						<p className="card-author">By: {comment.author}</p>
						<p className="card-date text-muted">Commented at: {new Date(comment.dateOfCreation).toLocaleString()}</p>

						{isAuthenticated && user?.id == comment.userId && (
							<div className="mt-2">
								<button className="btn btn-sm btn-warning me-2" onClick={() => setEditMode(true)}>
									Edit
								</button>
								<button className="btn btn-sm btn-danger" onClick={handleDelete}>
									Delete
								</button>
							</div>
						)}
					</>
				)}
			</div>
		</div>
	);
}
