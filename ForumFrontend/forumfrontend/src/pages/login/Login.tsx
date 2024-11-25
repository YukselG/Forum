import React, { FormEvent, useState } from "react";
import { Form, Link, useNavigate } from "react-router-dom";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const navigate = useNavigate();

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setError("");

		try {
			// TODO: Replace with actual login logic
			// const response = await loginUser({ email, password });
			// if (response.success) {
			//     navigate('/');
			// }
			console.log("Login submitted", { email });
			navigate("/");
		} catch (err) {
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
							<Form onSubmit={handleSubmit} className="form-create">
								<div className="mb-3">
									<label htmlFor="email" className="form-label">
										Email address
									</label>
									<input
										type="email"
										className="form-control"
										id="email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										required
									/>
								</div>
								<div className="mb-3">
									<label htmlFor="password" className="form-label">
										Password
									</label>
									<input
										type="password"
										className="form-control"
										id="password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
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
