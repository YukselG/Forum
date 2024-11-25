import { Post as PostType } from "../../interfaces/Post";
import { Link } from "react-router-dom";
import "./Post.css";

export default function Post({ post, linkToComments = true }: { post: PostType; linkToComments?: boolean }) {
	// const postContent = (
	// 	<tr className="postitem" key={post.id}>
	// 		<td className="post-title-description">
	// 			<div className="titletd1"> {post.title}</div>
	// 			<div className="descriptiontd2">{post.description}</div>
	// 			<div className="authortd3">Author: {post.author}</div>
	// 			<div className="post-lastupdated">Last updated: 12/02/24</div>
	// 		</td>
	// 	</tr>
	// );

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
			</div>
		</div>
	);

	return linkToComments ? <Link to={`${post.id}/comments`}>{postContent}</Link> : postContent;
}
