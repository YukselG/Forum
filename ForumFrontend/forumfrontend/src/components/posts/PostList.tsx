import { LoaderFunctionArgs, useLoaderData, useNavigate, useParams } from "react-router-dom";
import { Post as PostType } from "../../interfaces/Post";
import Post from "../post/Post";
import "./PostList.css";
import { GetAllPosts } from "../../api/services/postService/PostService";

const postsMock: PostType[] = [
	{
		id: 1,
		title: "The Future of Technology",
		description: "A deep dive into emerging technologies and their potential impacts on society.",
		author: "John Doe",
		dateOfCreation: new Date("2024-01-10T09:30:00"),
		numberOfComments: 3, // Represents 3 comments
		categoryId: 1, // Technology category
	},
	{
		id: 6,
		title: "AI: Good or bad?",
		description: "AI has taken everybody with storm. But is AI good or bad for us?",
		author: "Lex Fridman",
		dateOfCreation: new Date("2024-01-10T09:30:00"),
		numberOfComments: 9, // Represents 3 comments
		categoryId: 1, // Technology category
	},
	{
		id: 2,
		title: "10 Tips for a Healthier Lifestyle",
		description: "Practical tips to help you maintain a healthy and balanced lifestyle.",
		author: "Jane Smith",
		dateOfCreation: new Date("2024-02-15T14:45:00"),
		numberOfComments: 2, // Represents 2 comments
		categoryId: 2, // Health category
	},
	{
		id: 3,
		title: "Traveling the World on a Budget",
		description: "Explore how you can travel to amazing destinations without breaking the bank.",
		author: "Alice Johnson",
		dateOfCreation: new Date("2024-03-22T11:00:00"),
		numberOfComments: 4, // Represents 4 comments
		categoryId: 3, // Travel category
	},
	{
		id: 4,
		title: "The Importance of Education in the Modern World",
		description: "An in-depth look at how education shapes our future and drives progress.",
		author: "David Brown",
		dateOfCreation: new Date("2024-04-05T08:15:00"),
		numberOfComments: 5, // Represents 5 comments
		categoryId: 4, // Education category
	},
	{
		id: 5,
		title: "Delicious Recipes for Food Lovers",
		description: "A collection of mouth-watering recipes for those who love to cook and eat.",
		author: "Emily Davis",
		dateOfCreation: new Date("2024-05-12T17:20:00"),
		numberOfComments: 6, // Represents 6 comments
		categoryId: 5, // Food category
	},
];

export default function PostList() {
	const { posts } = useLoaderData() as { posts: PostType[] };

	const navigate = useNavigate();
	const handlePostClick = (post: PostType) => {
		navigate(`${post.id}/comments`, { state: { post } });
	};

	// return (
	// 	<div className="postList">
	// 		<table>
	// 			<thead>
	// 				<tr>
	// 					<th className="th1">Post</th>
	// 					<th className="th3">Comments</th>
	// 				</tr>
	// 			</thead>
	// 			<tbody>
	// 				{posts.map((post) => (
	// 					<div key={post.id} onClick={() => handlePostClick(post)}>
	// 						<tr className="postitem">
	// 							<td>
	// 								<Post post={post} linkToComments={true} />
	// 							</td>
	// 							<td className="post-comments">{post.numberOfComments}</td> {/* Customize Comments */}
	// 						</tr>
	// 					</div>
	// 				))}
	// 			</tbody>
	// 		</table>
	// 	</div>
	// );

	return (
		<div className="container mt-4">
			<table className="table table-hover">
				<thead className="table-light">
					<tr>
						<th>Post</th>
						<th>Comments</th>
					</tr>
				</thead>
				<tbody>
					{posts.map((post) => (
						<tr key={post.id} onClick={() => handlePostClick(post)} className="clickable-row col-12 mb-3">
							<td>
								<Post post={post} linkToComments={true} />
							</td>
							<td className="text-center">{post.numberOfComments}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

// loader function to load the data with useLoaderData (setting the loader property in the router)
// filtering the posts in the loader atm so only the necessary data is processed and rendered in the component
// If a lot of data is fetched with the posts, the filtering should probably be handled in the backend, so the frontend only requests the necessary data
export async function loader({ params }: LoaderFunctionArgs) {
	const posts = await getPosts();
	const filteredPosts = posts.filter((post) => post.categoryId === Number(params.categoryId));

	return { posts: filteredPosts };
}

// function to get posts
async function getPosts() {
	const posts: PostType[] = await GetAllPosts();
	const postsMock = getPostsMock();
	return posts;
}

async function getPostsMock() {
	return postsMock;
}

// not used
/* export async function loaderById(id: number) {
	const posts = await getPosts();
	const postsById = posts.filter((p) => p.categoryId == id);
	return { postsById };
}
 */
