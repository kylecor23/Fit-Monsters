import Popup from "../components/popup-menu";
import RandomChallengeSelector from "../components/ChallengeRandomizer";
import { Link } from "react-router-dom";
import { StatsContext } from "../components/StatsTracker";
import { useContext, useState, useEffect } from "react";
import MonstersInternalGoalTracker from "/Users/kyle/Desktop/Development/fit-monster/src/components/MonsterHealth.jsx";

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

	const [lastResetTime, setLastResetTime] = useState(new Date().getTime());

	useEffect(() => {
		// Check if it's a new day, week, or month
		const now = new Date().getTime();
		const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day
		const oneWeek = 7 * oneDay;
		const oneMonth = 30 * oneDay;

		if (now - lastResetTime >= oneDay) {
			// Reset daily challenges
			setLastResetTime(now);
			resetChallenges("dailyChallenges");
		}

		if (now - lastResetTime >= oneWeek) {
			// Reset weekly challenges
			setLastResetTime(now);
			resetChallenges("weeklyChallenges");
		}

		if (now - lastResetTime >= oneMonth) {
			// Reset monthly challenges
			setLastResetTime(now);
			resetChallenges("monthlyChallenges");
		}
	}, [lastResetTime]);

	const resetChallenges = (challengeType) => {
		//  logic to reset challenges goes here
		console.log(`Resetting ${challengeType}`);
	};

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
						<MonstersInternalGoalTracker goalType={"fitness"} />
						<MonstersInternalGoalTracker goalType={"health"} />
						<MonstersInternalGoalTracker goalType={"mind"} />
					</div>
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
					</div>
				</div>
			</main>
		</>
	);
}
