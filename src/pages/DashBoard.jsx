import Popup from "../components/popup-menu";
import RandomChallengeSelector from "../components/ChallengeRandomizer";
import { Link } from "react-router-dom";
import { StatsContext } from "../components/StatsTracker";
import { useContext, useState, useEffect } from "react";
import MonstersInternalGoalTracker from "/Users/kyle/Desktop/Development/fit-monster/src/components/MonsterHealth.jsx";

export default function DashBoard() {
	const challenges = [
		{ label: "Get a step goal of 8,000", number: 8000, type: "daily" },
		{ label: "Do 50 push-ups", number: 50, type: "daily" },
		{ label: "complete a HIIT workout", number: 1, type: "daily" },
		{ label: "walk a total of 20,000 steps ", number: 20000, type: "weekly" },
		{ label: "complete 3 workouts", number: 3, type: "weekly" },
		{ label: "read 3 hours this week", number: 3, type: "weekly" },
		{ label: "walk 50km", number: 67000, type: "monthly" },
		{ label: "complete 2 workouts a week", number: 2, type: "monthly" },
		{ label: "meditate 2min every day", number: 10, type: "monthly" },
	];

	const [currentDate, setCurrentDate] = useState(new Date());
	const [nextRefreshDate, setNextRefreshDate] = useState(getStartOfNextDay());
	const [week, setWeek] = useState(0);
	const month = currentDate.getMonth();
	const day = currentDate.getDate();

	function getStartOfNextDay() {
		const nextDay = new Date(currentDate);
		nextDay.setDate(nextDay.getDate() + 1);
		nextDay.setHours(0, 0, 0, 0);
		return nextDay;
	}

	useEffect(() => {
		const year = new Date(currentDate.getFullYear(), 0, 1);
		const days = Math.floor((currentDate - year) / (24 * 60 * 60 * 1000));
		const newWeek = Math.ceil((currentDate.getDay() + 1 + days) / 7);
		setWeek(newWeek);

		if (currentDate <= nextRefreshDate) {
		}
	}, [currentDate, nextRefreshDate]);
	console.log(week);
	console.log(day);
	console.log(month + 1);
	console.log(nextRefreshDate);

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
							challengeList={challenges.filter((item) => item.type === "daily")}
						/>
						<RandomChallengeSelector
							label="Weekly Challenge"
							challengeList={challenges.filter(
								(item) => item.type === "weekly"
							)}
						/>
						<RandomChallengeSelector
							label="Monthly Challenge"
							challengeList={challenges.filter(
								(item) => item.type === "monthly"
							)}
						/>
					</div>
				</div>
			</main>
		</>
	);
}
