import React, { useContext, useState, useEffect } from "react";
import Popup from "../components/popup-menu";
import { Link } from "react-router-dom";
import StatsContext from "../components/StatsContext";
import { pickItemBasedOnDate } from "../components/utils";
import SideNav from "../components/AsideNav";
import Monster from "../components/monster";

const challenges = [
	{
		label: "Get a step goal of 8,000",
		number: 8000,
		type: "daily",
		subtype: "steps",
	},
	{
		label: "walk 10000 steps",
		number: 10000,
		type: "daily",
		subtype: "steps",
	},
	{
		label: "Meditat for 5 miniutes",
		number: 1,
		type: "daily",
		subtype: "meditation",
	},
	{
		label: "walk a total of 20,000 steps",
		number: 20000,
		type: "weekly",
		subtype: "steps",
	},
	{
		label: "meditate for a total of 30 minutes",
		number: 3,
		type: "weekly",
		subtype: "meditation",
	},
	{
		label: "meditate for a total of 30 minutes",
		number: 3,
		type: "weekly",
		subtype: "meditation",
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

const getIsChallengeCompleted = (selectedChallenge, steps, meditation) => {
	let isChallengeCompleted = false;

	switch (selectedChallenge?.subtype) {
		case "steps":
			isChallengeCompleted = steps >= selectedChallenge.number;
			break;
		case "meditation":
			isChallengeCompleted = meditation >= selectedChallenge.number;
			break;
		default:
			// set isChallengeCompleted to false
			break;
	}

	return isChallengeCompleted;
};

const calculateProgress = (selectedChallenge, steps, meditation) => {
	const currentValue =
		selectedChallenge.subtype === "steps" ? steps : meditation;

	if (
		selectedChallenge.subtype === "steps" ||
		selectedChallenge.subtype === "meditation"
	) {
		return Math.min((currentValue / selectedChallenge.number) * 100, 100);
	} else if (selectedChallenge.subtype === "workout") {
		// Assuming workout challenges are counted in numbers completed
		return Math.min((currentValue / selectedChallenge.number) * 100, 100);
	} else if (selectedChallenge.subtype === "mental") {
		// Assuming mental challenges are counted in hours completed
		return Math.min((currentValue / selectedChallenge.number) * 100, 100);
	}
	return 0;
};

export default function ChallengePage() {
	const { steps, meditation } = useContext(StatsContext);

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
			steps,
			meditation
		);

		if (isChallengeCompleted) {
		}
	}, [dailySelectedChallenge, steps, meditation]);

	useEffect(() => {
		const isChallengeCompleted = getIsChallengeCompleted(
			weeklySelectedChallenge,
			steps,
			meditation
		);

		if (isChallengeCompleted) {
		}
	}, [weeklySelectedChallenge, steps, meditation]);

	useEffect(() => {
		const isChallengeCompleted = getIsChallengeCompleted(
			monthlySelectedChallenge,
			steps,
			meditation
		);

		if (isChallengeCompleted) {
		}
	}, [monthlySelectedChallenge, steps, meditation]);

	return (
		<>
			<div className="container">
				<SideNav />

				<main className="dashboardChallenges">
					<div className="Challengesdashboard">
						<div className="monster">
							<Monster />
							{/* <img
								src="https://media.istockphoto.com/id/1486708389/vector/cute-ghost-mascot-illustration-doing-weightlifting-illustration-of-a-ghost-doing-sports.jpg?s=612x612&w=0&k=20&c=e1aWV1pywLvXYqJcgiBz8zw1YciDGEvZ8cLHoE6uUR0="
								alt="fit monster"
							/> */}
						</div>
						<div className="challenges">
							<div className="challengesTwo">
								{[
									{
										challenge: dailySelectedChallenge,
										type: "Daily",
									},
									{
										challenge: weeklySelectedChallenge,
										type: "Weekly",
									},
									{
										challenge: monthlySelectedChallenge,
										type: "Monthly",
									},
								].map(({ challenge, type }) => {
									const progressPercentage = Math.round(
										calculateProgress(challenge, steps, meditation)
									);

									return (
										<div className="challengeBlock" key={type}>
											<h2>{`${type} Challenge`}</h2>
											{challenge && (
												<>
													<p>{challenge.label}</p>
													<div className="progressContainer">
														<progress
															className="progressBarChallanges"
															value={calculateProgress(
																challenge,
																steps,
																meditation
															)}
															max="100"
														></progress>

														<span className="progressPercentage">
															{progressPercentage}%
														</span>
													</div>
												</>
											)}
										</div>
									);
								})}
							</div>
						</div>
					</div>
				</main>
			</div>
		</>
	);
}
