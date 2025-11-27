import { Post as PostType, UpdatePostData } from "../../interfaces/Post";
import { Link } from "react-router-dom";
import "./Post.css";
import { useAuth } from "../../context/authentication/AuthContext";
import { DeletePost, UpdatePost } from "../../api/services/postService/PostService";
import { useState } from "react";

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
	const [editMode, setEditMode] = useState(false);
	const [editedPost, setEditedPost] = useState({
		id: post.id,
		title: post.title,
		description: post.description,
	});

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

	async function handleSave() {
		const updatedPost: UpdatePostData = {
			id: post.id,
			title: editedPost.title,
			description: editedPost.description,
		};
		try {
			await UpdatePost(post.id, updatedPost);
			window.location.reload();
		} catch (error) {
			console.error("error updating post: ", error);
		}
	}

	function handleTitleUpdate(e: React.ChangeEvent<HTMLInputElement>) {
		setEditedPost({
			...editedPost,
			title: e.target.value,
		});
	}

	function handleDescriptionUpdate(e: React.ChangeEvent<HTMLTextAreaElement>) {
		setEditedPost({
			...editedPost,
			description: e.target.value,
		});
	}

	const postContent = (
		<div className="card mb-3" key={post.id}>
			<div className="card-body">
				{editMode ? (
					<>
						<div className="mb-3">
							<label htmlFor="title" className="form-label editPost-label">
								Title
							</label>
							<input
								type="text"
								id="title"
								name="title"
								className="form-control"
								maxLength={300}
								value={editedPost.title}
								onChange={handleTitleUpdate}
							/>
						</div>
						<div className="mb-3">
							<label htmlFor="description" className="form-label editPost-label ">
								Description
							</label>
							<textarea
								name="description"
								id="description"
								rows={5}
								className="form-control"
								value={editedPost.description}
								onChange={handleDescriptionUpdate}
							></textarea>
						</div>
						<button className="btn btn-sm btn-success me-2" onClick={handleSave}>
							Save
						</button>
						<button className="btn btn-sm btn-secondary" onClick={() => setEditMode(false)}>
							Cancel
						</button>
					</>
				) : (
					<>
						<h5 className="card-title">{post.title}</h5>
						<p className="card-text">{post.description}</p>
						<p className="card-text">
							<small className="text-muted">Author: {post.username}</small>
						</p>
						<p className="card-text">
							<small className="text-muted">Created at: {new Date(post.dateOfCreation).toLocaleString()} </small>
						</p>

						{showActionButtons && isAuthenticated && user?.id === post.userId && (
							<div className="mt-2">
								<button onClick={() => setEditMode(true)} className="btn btn-sm btn-warning me-2">
									Edit
								</button>
								<button onClick={handleDelete} className="btn btn-sm btn-danger">
									Delete
								</button>
							</div>
						)}
					</>
				)}
			</div>
		</div>
	);

	return linkToComments ? <Link to={`/${post.categoryId}/posts/${post.id}/comments`}>{postContent}</Link> : postContent;
}
