import React, { useContext, useState, useEffect } from "react";
import Popup from "../components/popup-menu";
import { Link } from "react-router-dom";
import MonstersInternalGoalTracker from "../components/MonsterHealth";
import { getStartOfNextDay } from "../components/utils";
import StatsContext from "../components/StatsContex";
import StepsInputField from "../components/StatInput";

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
		subtype: "workout",
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

const nextRefreshDate = getStartOfNextDay(new Date());

const getIsChallengeCompleted = (selectedChallenge, steps) => {
	let isChallengeCompleted = false;

	switch (selectedChallenge?.subtype) {
		case "steps":
			isChallengeCompleted = steps >= selectedChallenge.number;
			break;

		default:
			//  set isChallengeCompleted to false
			break;
	}

	return isChallengeCompleted;
};

export default function DashBoard() {
	const { steps } = useContext(StatsContext);

	const [dailySelectedChallenge, setDailySelectedChallenge] = useState();
	const [week, setWeek] = useState(0);
	const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);

	useEffect(() => {
		const year = new Date(new Date().getFullYear(), 0, 1);
		setCurrentMonth(new Date().getMonth() + 1);
		const days = Math.floor((new Date() - year) / (24 * 60 * 60 * 1000));
		const newWeek = Math.ceil((new Date().getDay() + 1 + days) / 7);
		setWeek(newWeek);
	}, []);

	useEffect(() => {
		// Update daily challenge if the current date changes and the challenge is not completed
		if (new Date() <= nextRefreshDate) {
			const dailyChallenges = challenges.filter(
				(item) => item.type === "daily"
			);
			const randomIndex = Math.floor(Math.random() * dailyChallenges.length);
			const randomDailyChallenge = dailyChallenges[randomIndex];

			setDailySelectedChallenge((currentChallenge) => {
				if (currentChallenge?.label !== randomDailyChallenge.label) {
					return {
						...randomDailyChallenge,
						isCompleted: false,
					};
				}
				return currentChallenge;
			});
		}
	}, [steps]);

	useEffect(() => {
		const isChallengeCompleted = getIsChallengeCompleted(
			dailySelectedChallenge,
			steps
		);

		if (isChallengeCompleted) {
			console.log(`${dailySelectedChallenge.label} completed!`);
		}
	}, [dailySelectedChallenge, steps]);

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
						<div className="challengesTwo">
							<h2>Daily Challenge</h2>
							{dailySelectedChallenge && <p>{dailySelectedChallenge.label}</p>}
						</div>
					</div>
				</div>
			</main>
		</>
	);
}
