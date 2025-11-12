import React, { FormEvent, useState } from "react";
import { ActionFunctionArgs, Form, Link, useNavigate, redirect } from "react-router-dom";
import { LoginCredentials } from "../../interfaces/LoginCredentials";
import { LoginUser } from "../../api/services/accountService/LoginService";
import { useAuth } from "../../context/authentication/AuthContext";

export default function Login() {
	//const [email, setEmail] = useState("");
	//const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const navigate = useNavigate();

	const { login } = useAuth();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError("");

		try {
			const formData = new FormData(e.currentTarget);

			const loginCredentials: LoginCredentials = {
				email: formData.get("username") as string,
				password: formData.get("password") as string,
			};

			await login(loginCredentials);
			navigate("/");
		} catch (err) {
			console.log(err);
			setError("Login failed. Please check your credentials.");
		}
	};

	return (
		<div className="container mt-4">
			<div className="row justify-content-center">
				<div className="col-md-6">
					<div className="card">
						<div className="card-body">
							<h2 className="card-title text-center mb-4">Login to Your Account</h2>
							{error && (
								<div className="alert alert-danger" role="alert">
									{error}
								</div>
							)}
							<Form onSubmit={handleSubmit} method="post" className="form-create" id="login-form">
								<div className="mb-3">
									<label htmlFor="username" className="form-label">
										Username
									</label>
									<input name="username" type="text" className="form-control" id="username" required />
								</div>
								<div className="mb-3">
									<label htmlFor="password" className="form-label">
										Password
									</label>
									<input
										name="password"
										type="password"
										className="form-control"
										id="password"
										//value={password}
										//onChange={(e) => setPassword(e.target.value)}
										required
									/>
								</div>
								<button type="submit" className="btn btn-primary w-100 create-post-btn">
									Login
								</button>
							</Form>
							<div className="text-center mt-3">
								<p>
									Don't have an account? <Link to="/register">Register</Link>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

// export async function action({ request }: ActionFunctionArgs) {
// 	const formData = await request.formData();

// 	const loginCredentials: LoginCredentials = {
// 		email: formData.get("email") as string,
// 		password: formData.get("password") as string,
// 	};

// 	console.log(loginCredentials.email);
// 	console.log(loginCredentials.password);

// 	try {
// 		const userLogin = await LoginUser(loginCredentials);
// 		console.log("test");
// 		console.log(userLogin);
// 		return redirect("/");
// 	} catch (error) {
// 		console.error("Failed when calling LoginUser", error);
// 		throw new Error("Login attempt failed");
// 	}
// }
