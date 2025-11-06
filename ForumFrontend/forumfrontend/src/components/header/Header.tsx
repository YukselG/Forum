import sitelogo from "./ylogogreenyellow.jpeg";
import "./Header.css";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authentication/AuthContext";
import { useEffect, useState } from "react";

export default function Header() {
	const navigate = useNavigate();
	const [query, setQuery] = useState("");
	const location = useLocation();

	const { isAuthenticated, logout } = useAuth();

	function goToLogin() {
		let path = "/login";
		navigate(path);
	}

	function goToRegister() {
		let path = "/register";
		navigate(path);
	}

	async function handleLogout() {
		try {
			await logout();
			navigate("/");
		} catch (err) {
			console.error("Logout from navbar failed", err);
		}
	}

	function handleSearch(e: React.FormEvent) {
		e.preventDefault();
		// return without doing nothing if query is empty
		if (!query) return;
		navigate(`/search?query=${query}&type=posts`);
	}

	// Reset query state to empty string when leaving the /search route
	// also search input field clears (value bound to query)
	useEffect(() => {
		if (!location.pathname.startsWith("/search")) {
			setQuery("");
		}
	}, [location]);

	return (
		<div className="container">
			<div className="row align-items-center py-3">
				<div className="col-md-2 col-12 text-center text-md-start mb-3 mb-md-0">
					<Link to={`/`}>
						<img className="header-logo" src={sitelogo} alt="Site Logo" />
					</Link>
				</div>
				<div className="col-md-6 col-12 mb-3 mb-md-0">
					<form id="search-form" className="d-flex" onSubmit={handleSearch} method="get">
						<input
							className="form-control me-2"
							id="query"
							name="query"
							aria-label="Search"
							value={query}
							placeholder="Search for a category, post or something else"
							onChange={(e) => setQuery(e.target.value)}
							type="search"
						/>
						<button type="submit" className="btn btn-outline-secondary">
							<FontAwesomeIcon icon={faSearch} />
						</button>
					</form>
				</div>
				<div className="col-md-4 col-12 text-center text-md-end">
					<div className="user-buttons">
						{isAuthenticated ? (
							<button className="btn btn-danger" onClick={handleLogout}>
								Logout
							</button>
						) : (
							<>
								<button className="btn btn-outline-primary me-2" onClick={goToRegister}>
									Register
								</button>
								<button className="btn btn-primary" onClick={goToLogin}>
									Login
								</button>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
