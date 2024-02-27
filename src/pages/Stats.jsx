import React, { useContext, useState } from "react";
import StepsInputField from "../components/StatInput";
import { StatsContext } from "../components/StatsTracker";
import Popup from "../components/popup-menu";
import { Link } from "react-router-dom";
import SideNav from "../components/AsideNav";

function stats() {
	const { steps, calories, weight } = useContext(StatsContext);

	return (
		<div className="container">
			<SideNav />
			<main></main>
		</div>
	);

	// 	return (
	// 		<div>
	// 			<header>
	// 				<h1>Fit Monsters</h1>
	// 				<nav className="nav">
	// 					<Popup>
	// 						<ul>
	// 							<li>
	// 								<Link to="/dashboard">Dash</Link>
	// 							</li>
	// 							<li>
	// 								<a href="#">History</a>
	// 							</li>
	// 							<li>
	// 								<a href="#">Store</a>
	// 							</li>
	// 						</ul>
	// 					</Popup>
	// 				</nav>
	// 			</header>
	// 			<h1>Stats</h1>
	// 			<h2>steps:{steps}</h2>
	// 			<StepsInputField activity="steps" />
	// 			<h2>calories:{calories}</h2>
	// 			<StepsInputField activity="calories" />
	// 			<h2>weight:{weight}</h2>
	// 			<StepsInputField activity="weight" />
	// 			<br />
	// 			<div>
	// 				<Popup buttonText={"meditaion"}>
	// 					<h3>meditate</h3>
	// 					<button>stat meditation</button>
	// 				</Popup>
	// 			</div>
	// 		</div>
	// 	);
	// }
}
export default stats;
