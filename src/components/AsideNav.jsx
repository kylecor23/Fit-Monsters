import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faGhost,
	faChartLine,
	faScroll,
} from "@fortawesome/free-solid-svg-icons";

export default function SideNav() {
	const [activePage, setActivePage] = useState(() => {
		// Initialize activePage state with the value from localStorage, if available
		return localStorage.getItem("activePage") || "";
	});

	useEffect(() => {
		// Update localStorage when activePage state changes
		localStorage.setItem("activePage", activePage);
	}, [activePage]);

	const navigateTo = (route) => {
		window.location.href = route;
		setActivePage(route); // Update activePage when navigating manually
	};

	return (
		<aside className="nav">
			<header>
				<h1>Fit Monsters</h1>
			</header>
			<ul>
				<li>
					<button
						className={`nav-button ${
							activePage === "/dashboard" ? "active" : ""
						}`}
						onClick={() => navigateTo("/dashboard")}
					>
						<FontAwesomeIcon icon={faGhost} className="icon" />
						Home
					</button>
				</li>
				<li>
					<button
						className={`nav-button ${activePage === "/stats" ? "active" : ""}`}
						onClick={() => navigateTo("/stats")}
					>
						<FontAwesomeIcon icon={faChartLine} className="icon" />
						Stats
					</button>
				</li>
				<li>
					<button
						className={`nav-button ${
							activePage === "/challenges" ? "active" : ""
						}`}
						onClick={() => navigateTo("/challenges")}
					>
						<FontAwesomeIcon icon={faScroll} className="icon" />
						Challenges
					</button>
				</li>
			</ul>
		</aside>
	);
}
