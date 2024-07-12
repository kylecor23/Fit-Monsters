import React, { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faGhost,
	faChartLine,
	faScroll,
	faQuestion,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import StatsContext from "./StatsContext";

export default function SideNav() {
	const location = useLocation();
	const [activePage, setActivePage] = useState(() => {
		return localStorage.getItem("activePage") || "";
	});
	const { toggleGuide } = useContext(StatsContext);

	useEffect(() => {
		setActivePage(location.pathname);
	}, [location]);

	useEffect(() => {
		localStorage.setItem("activePage", activePage);
	}, [activePage]);

	const navigate = useNavigate();

	const navigateTo = (route) => {
		setActivePage(route);
		navigate(route);
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
				{/*	<li>
					<button className="nav-button" onClick={toggleGuide}>
						<FontAwesomeIcon icon={faQuestion} className="icon" />
						Guide
					</button>
					</li>*/}
			</ul>
		</aside>
	);
}
