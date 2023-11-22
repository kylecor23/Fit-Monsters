import Popup from "../components/popup-menu";
import RandomChallengeSelector from "../components/ChallengeRandomizer";
import { Link } from "react-router-dom";
import { StatsContext } from "../components/StatsTracker";
import { useContext } from "react";

export default function DashBoard() {
	const { steps, calories } = useContext(StatsContext);

	const dailyChallenges = [
		"Get a step goal of 8,000",
		"Do 50 push-ups",
		"complete a HIIT workout",
	];

	const weeklyChallenges = [
		"walk a total of 20,000 steps ",
		"complete 3 workouts",
		"read 3 hours this week",
	];

	const monthlyChallenges = [
		"walk 50km",
		"complete 2 workouts a week",
		"meditate 10min every day",
	];

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
						<h2>steps:{steps}</h2>
						<h2>calories:{calories}</h2>
					</div>
				</div>
			</main>
		</>
	);
}
