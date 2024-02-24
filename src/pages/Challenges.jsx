import { useContext, useState, useEffect } from "react";
import Popup from "../components/popup-menu";
import { Link } from "react-router-dom";
import StatsContext from "../components/StatsContex";
import { pickItemBasedOnDate } from "../components/utils";
import SideNav from "../components/AsideNav";

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

export default function ChallengePage() {
	const { steps, workout, calories, meditation, weight, journal } =
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

	return (
		<>
			<div className="container">
				<SideNav />

				<main className="dashboard">
					<div className="dashboard">
						<img
							src="https://media.istockphoto.com/id/1486708389/vector/cute-ghost-mascot-illustration-doing-weightlifting-illustration-of-a-ghost-doing-sports.jpg?s=612x612&w=0&k=20&c=e1aWV1pywLvXYqJcgiBz8zw1YciDGEvZ8cLHoE6uUR0="
							alt="fit monster"
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
				</main>
			</div>
		</>
	);
}
