import { useEffect, useState } from "react";
import { json, useLoaderData, useSearchParams } from "react-router-dom";
import { Post as PostType } from "../../interfaces/Post";
import Post from "../../components/post/Post";
import { Comment as CommentType } from "../../interfaces/Comment";
import Comment from "../../components/comment/Comment";
import { User as UserType } from "../../interfaces/User";
import { SearchPosts } from "../../api/services/postService/PostService";

export default function SearchResultsPage() {
	const { searchResults, type, query } = useLoaderData() as { searchResults: any[]; type: string; query: string };

	return (
		<div className="container mt-4">
			<h2>
				Search results for <em>{query}</em>
			</h2>

			{searchResults.length === 0 && (
				<p>
					No results found for <em>{query}</em>.
				</p>
			)}

			<div className="mt-3">
				{type === "posts" &&
					searchResults.map((post: PostType) => <Post key={post.id} post={post} showActionButtons={false} />)}

				{type === "comments" &&
					searchResults.map((comment: CommentType) => <Comment key={comment.id} comment={comment} />)}

				{type === "users" &&
					searchResults.map((user: any) => (
						<div key={user.id} className="card p-3 mb-2">
							<strong>{user.username}</strong>
						</div>
					))}
			</div>
		</div>
	);
}

export async function loader({ request }: { request: Request }) {
	const url = new URL(request.url);
	const query = url.searchParams.get("query");
	console.log("query = " + query);

	// defaulting the searched entity type to posts
	const type = url.searchParams.get("type") || "posts";

	let searchResults: any[] = [];

	if (!query) {
		console.log("empty searh query");
		console.log("searchResults = " + searchResults);
		console.log("type = " + type);

		return { searchResults, type };
	}

	try {
		switch (type) {
			case "comments":
				//searchResults = await SearchComments(query);
				break;

			case "users":
				//searchResults = await SearchUsers(query);
				break;

			default:
				searchResults = await SearchPosts(query);
				break;
		}

		return { searchResults, type, query };
	} catch (error) {
		console.error("Failed to load query or type");
	}
}
