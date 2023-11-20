import React, { useContext, useState } from "react";
import StepsInputField from "../reuseable-components/StatInput";
import {
	StatsProvider,
	StatsContext,
} from "../reuseable-components/StatsTracker";
import Popup from "../reuseable-components/popup-menu";
import { Link } from "react-router-dom";

function stats() {
	return (
		<StatsProvider>
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
				<StepsInputField activity="steps" />
				<StepsInputField activity="calories" />
			</div>
		</StatsProvider>
	);
}

export default stats;
