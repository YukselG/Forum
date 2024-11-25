import { Comment as CommentType } from "../../interfaces/Comment";
import "./Comment.css";

export default function Comment({ comment }: { comment: CommentType }) {
	// return (
	// 	<div>
	// 		<tr className="commentitem" key={comment.id}>
	// 			<td className="commentcontent"> {comment.content}</td>
	// 			<td className="commentdate">At: 14/02/23</td>
	// 			<td className="commenauthor">By: {comment.author}</td>
	// 		</tr>
	// 	</div>
	// );

	return (
		<div className="card">
			<div className="card-body">
				<p className="card-text">{comment.content}</p>
				<p className="card-author">By: {comment.author}</p>
				<p className="card-date text-muted">Commented at: {new Date(comment.dateOfCreation).toLocaleDateString()}</p>
			</div>
		</div>
	);
}
