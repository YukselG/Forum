import { LoaderFunctionArgs, useLoaderData, useNavigate, useParams } from "react-router-dom";
import { Post as PostType } from "../../interfaces/Post";
import Post from "../post/Post";
import "./PostList.css";
import { GetAllPosts, GetAllPostsFromCategory } from "../../api/services/postService/PostService";
import { useEffect, useState } from "react";

const postsMock: PostType[] = [
	// {
	// 	id: 1,
	// 	title: "The Future of Technology",
	// 	description: "A deep dive into emerging technologies and their potential impacts on society.",
	// 	userId: "1",
	// 	author: "John Doe",
	// 	dateOfCreation: new Date("2024-01-10T09:30:00"),
	// 	numberOfComments: 3, // Represents 3 comments
	// 	categoryId: 1, // Technology category
	// },
	// {
	// 	id: 6,
	// 	title: "AI: Good or bad?",
	// 	description: "AI has taken everybody with storm. But is AI good or bad for us?",
	// 	userId: "1",
	// 	author: "Lex Fridman",
	// 	dateOfCreation: new Date("2024-01-10T09:30:00"),
	// 	numberOfComments: 9, // Represents 3 comments
	// 	categoryId: 1, // Technology category
	// },
	// {
	// 	id: 2,
	// 	title: "10 Tips for a Healthier Lifestyle",
	// 	description: "Practical tips to help you maintain a healthy and balanced lifestyle.",
	// 	userId: "1",
	// 	author: "Jane Smith",
	// 	dateOfCreation: new Date("2024-02-15T14:45:00"),
	// 	numberOfComments: 2, // Represents 2 comments
	// 	categoryId: 2, // Health category
	// },
	// {
	// 	id: 3,
	// 	title: "Traveling the World on a Budget",
	// 	description: "Explore how you can travel to amazing destinations without breaking the bank.",
	// 	userId: "1",
	// 	author: "Alice Johnson",
	// 	dateOfCreation: new Date("2024-03-22T11:00:00"),
	// 	numberOfComments: 4, // Represents 4 comments
	// 	categoryId: 3, // Travel category
	// },
	// {
	// 	id: 4,
	// 	title: "The Importance of Education in the Modern World",
	// 	description: "An in-depth look at how education shapes our future and drives progress.",
	// 	userId: "1",
	// 	author: "David Brown",
	// 	dateOfCreation: new Date("2024-04-05T08:15:00"),
	// 	numberOfComments: 5, // Represents 5 comments
	// 	categoryId: 4, // Education category
	// },
	// {
	// 	id: 5,
	// 	title: "Delicious Recipes for Food Lovers",
	// 	description: "A collection of mouth-watering recipes for those who love to cook and eat.",
	// 	userId: "1",
	// 	author: "Emily Davis",
	// 	dateOfCreation: new Date("2024-05-12T17:20:00"),
	// 	numberOfComments: 6, // Represents 6 comments
	// 	categoryId: 5, // Food category
	// },
];

export default function PostList() {
	const { posts } = useLoaderData() as { posts: PostType[] };

	const navigate = useNavigate();
	const handlePostClick = (post: PostType) => {
		navigate(`${post.id}/comments`, { state: { post } });
	};

	const [sortedPosts, setSortedPosts] = useState<PostType[]>(posts);
	const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

	// run sorting when the sort order changes
	useEffect(() => {
		if (!posts) return;

		let sorted = [...posts];

		if (sortOrder == "newest") {
			sorted.sort((post1, post2) => new Date(post2.dateOfCreation).getTime() - new Date(post1.dateOfCreation).getTime());
		} else {
			sorted.sort((post1, post2) => new Date(post1.dateOfCreation).getTime() - new Date(post2.dateOfCreation).getTime());
		}

		setSortedPosts(sorted);
	}, [posts, sortOrder]);

	function handleSortChange(e: React.ChangeEvent<HTMLSelectElement>) {
		setSortOrder(e.target.value as "newest" | "oldest");
	}

	return (
		<div className="container mt-4">
			<table className="table table-hover">
				<thead className="table-light">
					<tr>
						<th>Post</th>
						<th>Comments</th>
					</tr>
					<tr>
						<div className="sort-posts mb3">
							<label htmlFor="sort-posts">
								<b>Sort by:</b>
							</label>
							<select name="sortPosts" id="sort-posts" value={sortOrder} onChange={handleSortChange}>
								<option value="newest">Newest</option>
								<option value="oldest">Oldest</option>
							</select>
						</div>
					</tr>
				</thead>
				<tbody>
					{sortedPosts.map((post) => (
						<tr key={post.id} onClick={() => handlePostClick(post)} className="clickable-row col-12 mb-3">
							<td>
								<Post post={post} linkToComments={true} showActionButtons={false} />
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
	const categoryId = Number(params.categoryId);
	const posts = await GetAllPostsFromCategory(categoryId);

	// no need to filter, since above GetAllPostsFromCategory method calls an endpoind where the backend does the filter
	// const posts = await GetAllPosts();
	// const filteredPosts = posts.filter((post: PostType) => post.categoryId === Number(params.categoryId));

	return { posts };
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
