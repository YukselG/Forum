import sitelogo from "./ylogogreenyellow.jpeg";
import "./Header.css";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, Navigate, useNavigate } from "react-router-dom";

export default function Header() {
	const navigate = useNavigate();

	function goToLogin() {
		let path = "/login";
		navigate(path);
	}

	function goToRegister() {
		let path = "/register";
		navigate(path);
	}

	return (
		<div className="container">
			<div className="row align-items-center py-3">
				<div className="col-md-2 col-12 text-center text-md-start mb-3 mb-md-0">
					<Link to={`/`}>
						<img className="header-logo" src={sitelogo} alt="Site Logo" />
					</Link>
				</div>
				<div className="col-md-6 col-12 mb-3 mb-md-0">
					<form id="search-form" className="d-flex" action="" method="get">
						<input
							className="form-control me-2"
							id="query"
							name="query"
							aria-label="Search"
							placeholder="Search for a category, post or something else"
							type="search"
						/>
						<button type="button" className="btn btn-outline-secondary">
							<FontAwesomeIcon icon={faSearch} />
						</button>
					</form>
				</div>
				<div className="col-md-4 col-12 text-center text-md-end">
					<div className="user-buttons">
						<button className="btn btn-outline-primary me-2" onClick={goToRegister}>
							Register
						</button>
						<button className="btn btn-primary" onClick={goToLogin}>
							Login
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

/* export default function Header() {
	return (
		<>
			<div className="headercontent">
				<Link to={`/`}>
					<img className="image" src={sitelogo} alt="site logo" />
				</Link>
				<form id="search-form" action="" method="get" className="">
					<div>
						<input
							className=""
							id="query"
							name="query"
							aria-label="Search"
							placeholder="Search for a category, post or something else"
							type="search"
						/>
					</div>
					<div>
						<button type="button" className="">
							<FontAwesomeIcon icon={faSearch} />
						</button>
					</div>
				</form>
				<div className="user">
					<button>Register</button>
					<button>Login</button>
				</div>
			</div>
		</>
	);
}
 */
