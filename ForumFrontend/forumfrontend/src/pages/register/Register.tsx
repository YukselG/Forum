import { FormEvent, useState } from "react";
import { Form, Link, useNavigate } from "react-router-dom";

export default function Register() {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("");

	const navigate = useNavigate();

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setError("");

		// Basic validation
		if (password !== confirmPassword) {
			setError("Passwords do not match");
			return;
		}

		if (password.length < 8) {
			setError("Password must be at least 8 characters long");
			return;
		}

		try {
			// TODO: Replace with actual registration logic
			// const response = await registerUser({ username, email, password });
			// if (response.success) {
			//     navigate('/login');
			// }
			console.log("Registration submitted", { username, email });
			navigate("/login");
		} catch (err) {
			setError("Registration failed. Please try again.");
		}
	};

	return (
		<div className="container mt-4">
			<div className="row justify-content-center">
				<div className="col-md-6">
					<div className="card">
						<div className="card-body">
							<h2 className="card-title text-center mb-4">Create an Account</h2>
							{error && (
								<div className="alert alert-danger" role="alert">
									{error}
								</div>
							)}
							<Form onSubmit={handleSubmit} className="form-create">
								<div className="mb-3">
									<label htmlFor="username" className="form-label">
										Username
									</label>
									<input
										type="text"
										className="form-control"
										id="username"
										value={username}
										onChange={(e) => setUsername(e.target.value)}
										required
									/>
								</div>
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
								<div className="mb-3">
									<label htmlFor="confirmPassword" className="form-label">
										Confirm Password
									</label>
									<input
										type="password"
										className="form-control"
										id="confirmPassword"
										value={confirmPassword}
										onChange={(e) => setConfirmPassword(e.target.value)}
										required
									/>
								</div>
								<button type="submit" className="btn btn-primary w-100 create-post-btn">
									Register
								</button>
							</Form>
							<div className="text-center mt-3">
								<p>
									Already have an account? <Link to="/login">Login</Link>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
