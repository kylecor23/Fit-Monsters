import Popup from "../components/popup-menu";
import RandomChallengeSelector from "../components/ChallengeRandomizer";
import { Link } from "react-router-dom";
import { StatsContext } from "../components/StatsTracker";
import { useContext, useState, useEffect } from "react";

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

	const storedLastResetTime = localStorage.getItem("lastResetTime");
	const initialLastResetTime = storedLastResetTime
		? parseInt(storedLastResetTime, 10)
		: new Date().getTime();

	const [lastResetTime, setLastResetTime] = useState(initialLastResetTime);

	useEffect(() => {
		const now = new Date().getTime();
		const oneDay = 10 * 1000; // For testing, set to 10 seconds
		const oneWeek = 7 * oneDay;
		const oneMonth = 30 * oneDay;

		console.log("Now:", now);
		console.log("Last Reset Time:", lastResetTime);

		if (now - lastResetTime >= oneDay) {
			setLastResetTime(now);
			resetChallenges("dailyChallenges");
			console.log("Daily challenge reset");
		}

		if (now - lastResetTime >= oneWeek) {
			setLastResetTime(now);
			resetChallenges("weeklyChallenges");
			console.log("Weekly challenge reset");
		}

		if (now - lastResetTime >= oneMonth) {
			setLastResetTime(now);
			resetChallenges("monthlyChallenges");
			console.log("Monthly challenge reset");
		}
	}, [lastResetTime]);

	useEffect(() => {
		// Save last reset time to localStorage
		localStorage.setItem("lastResetTime", lastResetTime.toString());
	}, [lastResetTime]);

	const resetChallenges = (challengeType) => {
		console.log(`Resetting ${challengeType} challenges`);

		// add logic to reset tasks
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
					<div className="monsterStats"></div>
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
						<p>Last Reset Time: {new Date(lastResetTime).toLocaleString()}</p>
						{/* for testing */}
					</div>
				</div>
			</main>
		</>
	);
}
