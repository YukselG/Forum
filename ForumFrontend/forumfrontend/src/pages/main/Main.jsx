import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import CategoryList from "../../components/categories/CategoryList";
import "./Main.css";
import { Outlet } from "react-router-dom";

export default function Main() {
	return (
		<div className="d-flex flex-column min-vh-100">
			<header>
				<Header />
			</header>
			<main className="flex-grow-1">
				<Outlet />
			</main>
			<footer>
				<Footer />
			</footer>
		</div>
	);
}
