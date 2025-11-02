import { useEffect, useState } from "react";
import { json, useLoaderData, useSearchParams } from "react-router-dom";
import { Post as PostType } from "../../interfaces/Post";
import Post from "../../components/post/Post";
import { Comment as CommentType } from "../../interfaces/Comment";
import Comment from "../../components/comment/Comment";
import { User as UserType } from "../../interfaces/User";
import { SearchPosts } from "../../api/services/postService/PostService";
import { SearchComments } from "../../api/services/commentService/CommentService";
import { SearchUsers } from "../../api/services/userService/UserService";

export default function SearchResultsPage() {
	const { searchResults, type, query } = useLoaderData() as { searchResults: any[]; type: string; query: string };

	// from react router doc: Returns a tuple of the current URL's URLSearchParams and a function to update them. Setting the search params causes a navigation.
	const [searchParams, setSearchParams] = useSearchParams();

	function handleTypeChange(newType: string) {
		searchParams.set("type", newType);
		setSearchParams(searchParams);
	}

	return (
		<div className="container mt-4">
			<h2>
				Search results for <em>{query}</em>
			</h2>
			{/* --- entitiy query buttons --- */}
			<div className="btn-group mt-3">
				<button
					className={`btn btn-outline-primary ${type === "posts" ? "active" : ""}`}
					onClick={() => handleTypeChange("posts")}
				>
					Posts
				</button>
				<button
					className={`btn btn-outline-primary ${type === "comments" ? "active" : ""}`}
					onClick={() => handleTypeChange("comments")}
				>
					Comments
				</button>
				<button
					className={`btn btn-outline-primary ${type === "users" ? "active" : ""}`}
					onClick={() => handleTypeChange("users")}
				>
					Users
				</button>
			</div>
			{searchResults.length === 0 && (
				<p className="mt-3">
					No results found for <em>{query}</em>.
				</p>
			)}
			{/* --- query results --- */}

			{/*  TODO: Probably sort posts and comments based on date (new/old). Also make functionality so an user can sort 
			// TODO: For user, probably sort alphabetically? */}
			<div className="mt-3">
				{type === "posts" &&
					searchResults.map((post: PostType) => <Post key={post.id} post={post} showActionButtons={false} />)}

				{type === "comments" &&
					searchResults.map((comment: CommentType) => <Comment key={comment.id} comment={comment} />)}

				{type === "users" &&
					searchResults.map((user: UserType) => (
						<div key={user.id} className="card p-3 mb-2">
							<strong>{user.userName}</strong>
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
				searchResults = await SearchComments(query);
				// sort it to show newest as default (maybe add sort option?)
				searchResults.sort(
					(comment1, comment2) =>
						new Date(comment2.dateOfCreation).getTime() - new Date(comment1.dateOfCreation).getTime()
				);
				console.log(searchResults);

				break;

			case "users":
				searchResults = await SearchUsers(query);
				// sort alphabetically
				searchResults.sort();
				console.log(searchResults);

				break;

			default:
				searchResults = await SearchPosts(query);
				// sort it to show newest as default (maybe add sort option?)
				searchResults.sort(
					(post1, post2) => new Date(post2.dateOfCreation).getTime() - new Date(post1.dateOfCreation).getTime()
				);
				console.log(searchResults);

				break;
		}

		return { searchResults, type, query };
	} catch (error) {
		console.error("Failed to load query or type");
	}
}
