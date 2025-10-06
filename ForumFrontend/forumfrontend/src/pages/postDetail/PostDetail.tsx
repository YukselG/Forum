import { ActionFunctionArgs, Form, json, LoaderFunctionArgs, redirect, useLoaderData, useLocation } from "react-router-dom";
import CommentList from "../../components/comments/CommentList";
import Post from "../../components/post/Post";
import { Post as PostType } from "../../interfaces/Post";
import { Comment as CommentType, CreateCommentData } from "../../interfaces/Comment";
import "./postDetail.css";
import GetAllComments, { CreateComment } from "../../api/services/commentService/CommentService";
import { GetPostById } from "../../api/services/postService/PostService";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/authentication/AuthContext";

export default function PostDetail() {
	const { post, comments } = useLoaderData() as { post: PostType; comments: CommentType[] };
	const location = useLocation();
	const { isAuthenticated } = useAuth();

	const [sortedComments, setSortedComments] = useState<CommentType[]>(comments);
	const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

	// Effect to reset form when navigation occurs (successful submission of form)
	useEffect(() => {
		const form = document.getElementById("comment-form") as HTMLFormElement;
		if (form) {
			form.reset();
		}
	}, [location]);

	// run sorting when comments change or when the sort order changes
	useEffect(() => {
		if (!comments) return;

		let sorted = [...comments];

		if (sortOrder == "newest") {
			sorted.sort(
				(comment1, comment2) => new Date(comment2.dateOfCreation).getTime() - new Date(comment1.dateOfCreation).getTime()
			);
		} else {
			sorted.sort(
				(comment1, comment2) => new Date(comment1.dateOfCreation).getTime() - new Date(comment2.dateOfCreation).getTime()
			);
		}

		setSortedComments(sorted);
	}, [comments, sortOrder]);

	function handleSortChange(e: React.ChangeEvent<HTMLSelectElement>) {
		setSortOrder(e.target.value as "newest" | "oldest");
	}

	if (!post) return <p>Post not found</p>;
	if (!comments) return <p>Loading comments...</p>;

	return (
		<div className="container mt-4">
			<div className="post-detail mb-4">
				<Post post={post} linkToComments={false} showActionButtons={true} />
			</div>

			<div className="comment-list">
				<h3 className="h3 mb-3">Comments: {post.numberOfComments}</h3>
				<div className="sort-comments mb3">
					<label htmlFor="sort-comments">
						<b>Sort by:</b>
					</label>
					<select name="sortComments" id="sort-comments" value={sortOrder} onChange={handleSortChange}>
						<option value="newest">Newest</option>
						<option value="oldest">Oldest</option>
					</select>
				</div>

				<CommentList comments={sortedComments} />
			</div>

			<div className="comment-form mt-4">
				<Form method="post" id="comment-form">
					<div className="mb-3">
						<label htmlFor="comment-content" className="form-label">
							Add a Comment
						</label>
						<textarea
							className="form-control"
							name="comment-content"
							id="comment-content"
							rows={5}
							required
						></textarea>
					</div>
					{isAuthenticated ? (
						<button type="submit" className="btn btn-primary">
							Add Comment
						</button>
					) : (
						<button type="button" className="btn btn-secondary" disabled>
							Login required to create comment
						</button>
					)}
				</Form>
			</div>
		</div>
	);
}

export async function loader({ params }: LoaderFunctionArgs) {
	try {
		// specific post:
		const postId = Number(params.postId);
		const post = await GetPostById(postId);

		// comments
		const comments: CommentType[] = await GetAllComments();
		const filteredComments = comments.filter((comment) => comment.postId === Number(params.postId));
		const sortByOldestCommentsAtTop = filteredComments.sort(
			(comment1, comment2) => new Date(comment1.dateOfCreation).getTime() - new Date(comment2.dateOfCreation).getTime()
		);

		return json({ post, comments: sortByOldestCommentsAtTop });
	} catch (error) {
		console.error("Failed to load post or comments:", error);
		throw new Error("Failed to load post or comments");
	}
}

export async function action({ request, params }: ActionFunctionArgs) {
	const formData = await request.formData();

	const categoryId = Number(params.categoryId);
	const postId = Number(params.postId);

	if (!postId) {
		throw new Error("Post ID is required to create a comment.");
	}

	const comment: CreateCommentData = {
		content: formData.get("comment-content") as string,
		postId: postId,
	};

	console.log(comment);

	try {
		const createdComment = await CreateComment(comment);
		return redirect(``);
	} catch (error) {
		console.error("Failed when calling CreateComment", error);
		throw new Error("Comment creation failed");
	}
}
