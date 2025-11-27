import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { Comment as CommentType } from "../../interfaces/Comment";
import Comment from "../comment/Comment";
import "./CommentList.css";

// const commentsMock: CommentType[] = [
// 	{
// 		id: 1,
// 		content: "This is a fascinating article! Really made me think about the future.",
// 		author: "Sarah Connor",
// 		userId: "1",
// 		dateOfCreation: new Date("2024-01-11T10:30:00"),
// 		postId: 1, // Linked to the post "The Future of Technology"
// 	},
// 	{
// 		id: 2,
// 		content: "Great read! I'm excited to see where technology takes us.",
// 		author: "Kyle Reese",
// 		userId: "1",
// 		dateOfCreation: new Date("2024-01-12T12:45:00"),
// 		postId: 1, // Linked to the post "The Future of Technology"
// 	},
// 	{
// 		id: 3,
// 		content: "I've been trying to live a healthier lifestyle, and these tips are super helpful.",
// 		author: "John Connor",
// 		userId: "1",
// 		dateOfCreation: new Date("2024-02-16T14:30:00"),
// 		postId: 2, // Linked to the post "10 Tips for a Healthier Lifestyle"
// 	},
// 	{
// 		id: 4,
// 		content: "Loved the tips, especially the one about staying hydrated.",
// 		author: "T-800",
// 		userId: "1",
// 		dateOfCreation: new Date("2024-02-17T16:20:00"),
// 		postId: 2, // Linked to the post "10 Tips for a Healthier Lifestyle"
// 	},
// 	{
// 		id: 5,
// 		content: "Budget travel is the way to go! Thanks for the great advice.",
// 		author: "Marcus Wright",
// 		userId: "1",
// 		dateOfCreation: new Date("2024-03-23T11:30:00"),
// 		postId: 3, // Linked to the post "Traveling the World on a Budget"
// 	},
// 	{
// 		id: 6,
// 		content: "I'm planning a trip soon, and this article was just what I needed.",
// 		author: "Kate Brewster",
// 		userId: "1",
// 		dateOfCreation: new Date("2024-03-24T12:45:00"),
// 		postId: 3, // Linked to the post "Traveling the World on a Budget"
// 	},
// 	{
// 		id: 7,
// 		content: "Education is indeed the foundation of our future. Well written!",
// 		author: "Danny Dyson",
// 		userId: "1",
// 		dateOfCreation: new Date("2024-04-06T09:10:00"),
// 		postId: 4, // Linked to the post "The Importance of Education in the Modern World"
// 	},
// 	{
// 		id: 8,
// 		content: "I completely agree with the points made in this article. Education is key.",
// 		author: "John Henry",
// 		userId: "1",
// 		dateOfCreation: new Date("2024-04-07T10:20:00"),
// 		postId: 4, // Linked to the post "The Importance of Education in the Modern World"
// 	},
// 	{
// 		id: 9,
// 		content: "These recipes are fantastic! I can't wait to try them out.",
// 		author: "Blair Williams",
// 		userId: "1",
// 		dateOfCreation: new Date("2024-05-13T18:00:00"),
// 		postId: 5, // Linked to the post "Delicious Recipes for Food Lovers"
// 	},
// 	{
// 		id: 10,
// 		content: "I tried the pasta recipe, and it was a hit with my family!",
// 		author: "Catherine Weaver",
// 		userId: "1",
// 		dateOfCreation: new Date("2024-05-14T19:15:00"),
// 		postId: 5, // Linked to the post "Delicious Recipes for Food Lovers"
// 	},
// 	{
// 		id: 11,
// 		content: "AI is such a complex topic, and this article breaks it down nicely.",
// 		author: "Miles Dyson",
// 		userId: "1",
// 		dateOfCreation: new Date("2024-01-12T09:30:00"),
// 		postId: 6, // Linked to the post "AI: Good or bad?"
// 	},
// 	{
// 		id: 12,
// 		content: "I have mixed feelings about AI, but this article gave me some new insights.",
// 		author: "Dr. Silberman",
// 		userId: "1",
// 		dateOfCreation: new Date("2024-01-13T10:45:00"),
// 		postId: 6, // Linked to the post "AI: Good or bad?"
// 	},
// ];

export default function CommentList({ comments }: { comments: CommentType[] }) {
	//const { comments } = useLoaderData() as { comments: CommentType[] };

	// return (
	// 	<div className="commentList">
	// 		<table>
	// 			<tbody>
	// 				{comments.map((comment) => (
	// 					<Comment comment={comment} />
	// 				))}
	// 			</tbody>
	// 		</table>
	// 	</div>
	// );

	return (
		<div className="row mt-4">
			{comments.map((comment) => (
				<div className="" key={comment.id}>
					<Comment comment={comment} linkToPost={false} />
				</div>
			))}
		</div>
	);
}

// loader function to load the data with useLoaderData (setting the loader property in the router)
// filtering the comments in the loader atm so only the necessary data is processed and rendered in the component
// If a lot of data is fetched with the comments, the filtering should probably be handled in the backend, so the frontend only requests the necessary data
/* export async function loader({ params }: LoaderFunctionArgs) {
	const comments = await getComments();
	const filteredComments = comments.filter((comment) => comment.postId === Number(params.postId));
	return { comments: filteredComments };
}

async function getComments() {
	const comments: CommentType[] = await GetAllComments();
	const commentsMock = GetCommentsMock();
	return comments;
}

async function GetCommentsMock() {
	return commentsMock;
} */
