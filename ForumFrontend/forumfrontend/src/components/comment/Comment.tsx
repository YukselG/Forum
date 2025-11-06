import { useState } from "react";
import { DeleteComment, UpdateComment } from "../../api/services/commentService/CommentService";
import { useAuth } from "../../context/authentication/AuthContext";
import { Comment as CommentType } from "../../interfaces/Comment";
import { UpdateCommentData } from "../../interfaces/Comment";
import "./Comment.css";
import { useNavigate } from "react-router-dom";
import { GetPostById } from "../../api/services/postService/PostService";

export default function Comment({ comment, linkToPost }: { comment: CommentType; linkToPost: boolean }) {
	const navigate = useNavigate();
	const { isAuthenticated, user } = useAuth();
	const [editMode, setEditMode] = useState(false);
	const [editedContent, setEditedContent] = useState(comment.content);

	async function handleNavigateToPost() {
		if (!linkToPost) return; // only possible to navigate when in a results page

		try {
			const post = await GetPostById(comment.postId);

			if (!post) return;
			const categoryId = post.categoryId;

			if (!categoryId) return;

			navigate(`/${categoryId}/posts/${post.id}/comments`);
		} catch (error) {
			console.error("Failed to navigate to post:", error);
		}
	}

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

	const commentContent = (
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

	return linkToPost ? (
		<div onClick={handleNavigateToPost} style={{ cursor: "pointer" }}>
			{commentContent}
		</div>
	) : (
		<div>{commentContent}</div>
	);
}
