import Popup from "../reuseable-components/popup-menu";
import RandomChallengeSelector from "../reuseable-components/ChallengeRandomizer";
import stats from "./Stats";
import { Link } from "react-router-dom";
import {
	StatsProvider,
	StatsContext,
} from "../reuseable-components/StatsTracker";
import React, { useContext } from "react";

export default function DashBoard() {
	const { stats } = useContext(StatsContext);

	const dailyChallenges = [
		"Get a step goal of 8,000",
		"Do 50 push-ups",
		"complete a HIIT workout",
	];

	const weeklyChallenges = [
		"walk a total of 20,000 steps ",
		"complet 3 workouts",
		"read 3 hours this week",
	];

	const monthlyChallenges = [
		"walk 50km",
		"complete 2 workouts a week",
		"meditate 10min every day",
	];

	return (
		<>
			<StatsProvider>
				<header>
					<h1>Fit Monsters</h1>
					<nav className="nav">
						<Popup>
							<ul>
								<li>
									<Link to="/stats">Stats</Link>
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

				<main>
					<div>
						<h1>dashboard</h1>
						<div className="challenges">
							<RandomChallengeSelector
								label="Daily Challenge"
								challengeList={dailyChallenges}
							/>
							<RandomChallengeSelector
								label="Weekly Challenge"
								challengeList={weeklyChallenges}
							/>
							<RandomChallengeSelector
								label="Monthly Challenge"
								challengeList={monthlyChallenges}
							/>
							<h2>steps:{stats.steps}</h2>
							<h2>calories:{stats.calories}</h2>
						</div>
					</div>
				</main>
			</StatsProvider>
		</>
	);
}
