import React, { useContext, useState } from "react";
import StepsInputField from "../components/StatInput";
import { StatsProvider, StatsContext } from "../components/StatsTracker";
import Popup from "../components/popup-menu";
import { Link } from "react-router-dom";

function stats() {
	const { steps } = useContext(StatsContext);

	return (
		<div>
			<header>
				<h1>Fit Monsters</h1>
				<nav className="nav">
					<Popup>
						<ul>
							<li>
								<Link to="/dashboard">Dash</Link>
							</li>
							<li>
								<a href="#">History</a>
							</li>
							<li>
								<a href="#">Store</a>
							</li>
						</ul>
					</Popup>
				</nav>
			</header>
			<h1>Stats</h1>
			<h2>steps:{steps}</h2>
			<StepsInputField activity="steps" />
			<StepsInputField activity="calories" />
		</div>
	);
}

export default stats;
