import { useContext, useState, useEffect } from "react";
import Popup from "../components/popup-menu";
import { Link } from "react-router-dom";
import MonstersInternalGoalTracker from "../components/MonsterHealth";
import StatsContext from "../components/StatsContex";
import { pickItemBasedOnDate } from "../components/utils";

const challenges = [
	{
		label: "Get a step goal of 8,000",
		number: 8000,
		type: "daily",
		subtype: "steps",
	},
	{ label: "Do 50 push-ups", number: 50, type: "daily", subtype: "workout" },
	{
		label: "complete a HIIT workout",
		number: 1,
		type: "daily",
		subtype: "steps",
	},
	{
		label: "walk a total of 20,000 steps",
		number: 20000,
		type: "weekly",
		subtype: "steps",
	},
	{
		label: "complete 3 workouts",
		number: 3,
		type: "weekly",
		subtype: "steps",
	},
	{
		label: "read 3 hours this week",
		number: 3,
		type: "weekly",
		subtype: "mental",
	},
	{
		label: "walk 50km",
		number: 67000,
		type: "monthly",
		subtype: "steps",
	},
	{
		label: "complete 2 workouts a week",
		number: 2,
		type: "monthly",
		subtype: "workout",
	},
	{
		label: "meditate 2min every day",
		number: 10,
		type: "monthly",
		subtype: "mental",
	},
];

const getIsChallengeCompleted = (selectedChallenge, steps) => {
	let isChallengeCompleted = false;

	switch (selectedChallenge?.subtype) {
		case "steps":
			isChallengeCompleted = steps >= selectedChallenge.number;
			break;

		default:
			// set isChallengeCompleted to false
			break;
	}

	return isChallengeCompleted;
};

export default function DashBoard() {
	const { steps, workout, calories, meditation, weight } =
		useContext(StatsContext);

	const [dailySelectedChallenge, setDailySelectedChallenge] = useState(
		pickItemBasedOnDate(challenges, "daily")
	);

	const [weeklySelectedChallenge, setWeeklySelectedChallenge] = useState(
		pickItemBasedOnDate(challenges, "weekly")
	);

	const [monthlySelectedChallenge, setMonthlySelectedChallenge] = useState(
		pickItemBasedOnDate(challenges, "monthly")
	);

	useEffect(() => {
		const isChallengeCompleted = getIsChallengeCompleted(
			dailySelectedChallenge,
			steps
		);

		if (isChallengeCompleted) {
			console.log(`${dailySelectedChallenge.label} completed!`);
		}
	}, [dailySelectedChallenge, steps]);

	useEffect(() => {
		const isChallengeCompleted = getIsChallengeCompleted(
			weeklySelectedChallenge,
			steps
		);
		if (isChallengeCompleted) {
			console.log(`${weeklySelectedChallenge.label} completed!`);
		}
	}, [weeklySelectedChallenge, steps]);

	useEffect(() => {
		const isChallengeCompleted = getIsChallengeCompleted(
			monthlySelectedChallenge,
			steps
		);
		if (isChallengeCompleted) {
			console.log(`${monthlySelectedChallenge.label} completed!`);
		}
	}, [monthlySelectedChallenge, steps]);

	// (replace with real logic)
	const fitnessProgress = Math.min((steps / 8000) * 100, 100);
	const healthProgress = Math.min((calories / 2500) * 100, 100); // Assuming 2500 is the goal
	const mindProgress = Math.min((meditation / 10) * 100, 100); // Assuming 10 minutes is the goal

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
						<MonstersInternalGoalTracker
							goalType="fitness"
							progress={fitnessProgress}
						/>
						<MonstersInternalGoalTracker
							goalType="health"
							progress={healthProgress}
						/>
						<MonstersInternalGoalTracker
							goalType="mind"
							progress={mindProgress}
						/>
					</div>
					<div className="challenges">
						<div className="challengesTwo">
							<div className="challenge">
								<h2>Daily Challenge</h2>
								{dailySelectedChallenge && (
									<p>{dailySelectedChallenge.label}</p>
								)}
							</div>
							<div className="challenge">
								<h2>Weekly Challenge</h2>
								{weeklySelectedChallenge && (
									<p>{weeklySelectedChallenge.label}</p>
								)}
							</div>
							<div className="challenge">
								<h2>Monthly Challenge</h2>
								{monthlySelectedChallenge && (
									<p>{monthlySelectedChallenge.label}</p>
								)}
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}
