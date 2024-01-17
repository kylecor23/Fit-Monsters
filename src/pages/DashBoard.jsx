import { useContext, useState, useEffect } from "react";
import Popup from "../components/popup-menu";
import { Link } from "react-router-dom";
import MonstersInternalGoalTracker from "../components/MonsterHealth";
import StatsContext from "../components/StatsContex";
import { pickItemBasedOnDate } from "../components/utils";
import StepsInputField from "../components/StatInput";

export default function DashBoard() {
	const { steps, workout, calories, meditation, weight } =
		useContext(StatsContext);

	// used for progress bar
	const fitnessProgress = Math.min((steps / 8000) * 100, 100);
	const healthProgress = Math.min((calories / 2500) * 100, 100); // Assuming 2500  goal
	const mindProgress = Math.min((meditation / 10) * 100, 100); // Assuming 10 minutes  goal
	// end

	return (
		<>
			<header>
				<h1>Fit Monsters</h1>
				<nav className="nav">
					<Popup>
						<ul>
							<li>
								<Link to="/stats">Stats</Link>
							</li>
							<li>
								<Link to="/challenges">Challenges</Link>
							</li>
						</ul>
					</Popup>
				</nav>
			</header>

			<main>
				<div>
					<h1>dashboard</h1>
					<div className="challenges">
						<MonstersInternalGoalTracker
							goalType="fitness"
							progress={fitnessProgress}
						>
							<StepsInputField activity="steps" />
						</MonstersInternalGoalTracker>

						<MonstersInternalGoalTracker
							goalType="health"
							progress={healthProgress}
						>
							<StepsInputField activity="calories" />
							<StepsInputField activity="weight" />
						</MonstersInternalGoalTracker>

						<MonstersInternalGoalTracker
							goalType="mind"
							progress={mindProgress}
						/>
					</div>
				</div>
			</main>
		</>
	);
}
