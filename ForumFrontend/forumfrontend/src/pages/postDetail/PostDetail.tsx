import { ActionFunctionArgs, Form, json, LoaderFunctionArgs, redirect, useLoaderData, useLocation } from "react-router-dom";
import CommentList from "../../components/comments/CommentList";
import Post from "../../components/post/Post";
import { Post as PostType } from "../../interfaces/Post";
import { Comment as CommentType, CreateCommentData } from "../../interfaces/Comment";
import "./postDetail.css";
import GetAllComments, { CreateComment } from "../../api/services/commentService/CommentService";
import { GetPostById } from "../../api/services/postService/PostService";
import { useEffect } from "react";

/* type LoaderData = {
	post: PostType;
	comments: CommentType[];
}; */

export default function PostDetail() {
	const { post, comments } = useLoaderData() as { post: PostType; comments: CommentType[] };
	const location = useLocation();

	// Effect to reset form when navigation occurs (successful submission of form)
	useEffect(() => {
		const form = document.getElementById("comment-form") as HTMLFormElement;
		if (form) {
			form.reset();
		}
	}, [location]);

	// return (
	// 	<div>
	// 		<div className="postDetail">
	// 			<table>
	// 				<tbody>
	// 					<Post post={post} linkToComments={false} />
	// 				</tbody>
	// 			</table>

	// 			<h2>Comments: {post.numberOfComments}</h2>
	// 			<CommentList />
	// 		</div>
	// 		<div className="commentform">
	// 			<Form method="post" id="comment-form">
	// 				<div className="formelements">
	// 					<span>Add a comment</span>
	// 					<textarea name="addcomment" id="comment-input" rows={10} cols={50}></textarea>
	// 					<button type="submit">Add comment</button>
	// 				</div>
	// 			</Form>
	// 		</div>
	// 	</div>
	// );

	if (!post) return <p>Post not found</p>;
	if (!comments) return <p>Loading comments...</p>;

	return (
		<div className="container mt-4">
			<div className="post-detail mb-4">
				<Post post={post} linkToComments={false} />
			</div>

			<div className="comment-list">
				<h3 className="h4 mb-3">Comments: {post.numberOfComments}</h3>
				<CommentList comments={comments} />
			</div>

			<div className="comment-form mt-4">
				<Form method="post" id="comment-form">
					<div className="mb-3">
						<label htmlFor="comment-content" className="form-label">
							Add a Comment
						</label>
						<textarea className="form-control" name="comment-content" id="comment-content" rows={5} required></textarea>
					</div>
					<button type="submit" className="btn btn-primary">
						Add Comment
					</button>
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

		return json({ post, comments: filteredComments });
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
		author: "Ole",
		postId: postId,
	};

	console.log(comment);

	try {
		const createdComemnt = await CreateComment(comment);
		return redirect(``);
	} catch (error) {
		console.error("Failed when calling CreateComment", error);
		throw new Error("Comment creation failed");
	}
}
