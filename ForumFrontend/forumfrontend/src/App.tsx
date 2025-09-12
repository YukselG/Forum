import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Category from "./components/category/Category";
import Navbar from "./components/header/Header";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./pages/main/Main";
import ErrorPage from "./ErrorPage";
import CategoryList, { loader as categoryListLoader } from "./components/categories/CategoryList";
import PostList, { loader as postListLoader } from "./components/posts/PostList";
import CommentList from "./components/comments/CommentList";
import PostDetail, { loader as postDetailLoader, action as postDetailAction } from "./pages/postDetail/PostDetail";
import PostListPage from "./pages/postListPage/PostListPage";
import PostCreate, { action as PostCreateAction } from "./pages/postCreate/PostCreate";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import { AuthProvider } from "./context/authentication/AuthContext";
function App() {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <Main />,
			errorElement: <ErrorPage />,
			children: [
				{
					index: true,
					element: <CategoryList />,
					loader: categoryListLoader,
				},
				{
					path: ":categoryId/posts",
					element: <PostListPage />,
					loader: postListLoader,
				},
				{
					path: ":categoryId/posts/:postId/comments",
					element: <PostDetail />,
					loader: postDetailLoader,
					action: postDetailAction,
				},
				{
					path: ":categoryId/posts/CreatePost",
					element: <PostCreate />,
					action: PostCreateAction,
				},
				{
					path: "/register",
					element: <Register />,
				},
				{
					path: "/login",
					element: <Login />,
				},
			],
		},
	]);

	return (
		<div className="App">
			<AuthProvider>
				<RouterProvider router={router} />
			</AuthProvider>
		</div>
	);
}

export default App;
