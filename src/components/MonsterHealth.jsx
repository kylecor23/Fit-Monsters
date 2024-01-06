import React, { useContext, useState, useEffect } from "react";
import { StatsContext } from "../components/StatsTracker";

function MonstersInternalGoalTracker({ goalType }) {
	const { steps, workout, calories, meditation, weight } =
		useContext(StatsContext);
	const [isGoalCompleted, setGoalCompleted] = useState(false);
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		let currentGoalValue;
		let goalProgress = 0;

		switch (goalType) {
			case "fitness":
				currentGoalValue = steps >= 4000 || workout >= 30;
				goalProgress = currentGoalValue ? 100 : (steps / 4000) * 100;
				break;
			case "health":
				currentGoalValue = calories >= 1900 && weight > 0;
				goalProgress = currentGoalValue ? 100 : (calories / 1900) * 100;
				break;
			case "mind":
				currentGoalValue = meditation >= 5;
				goalProgress = currentGoalValue ? 100 : (meditation / 5) * 100;
				break;
			default:
				currentGoalValue = false;
				break;
		}

		setGoalCompleted(currentGoalValue);
		setProgress(goalProgress);
	}, [goalType, steps, workout, calories, meditation, weight]);

	return (
		<div>
			<div className="progress-container">
				<div className="progress"></div>
			</div>
			<p>
				{goalType} Goal Completed: {isGoalCompleted ? "Yes" : "No"}
			</p>
		</div>
	);
}

export default MonstersInternalGoalTracker;
