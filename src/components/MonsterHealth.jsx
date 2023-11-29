import React, { useContext, useState, useEffect } from "react";
import { StatsContext } from "../components/StatsTracker";

// will have to change to take in user settings(thresholds for items like calories)
function MonstersInternalGoalTracker({ goalType }) {
	const { steps, workout, calories, meditation, weight } =
		useContext(StatsContext);
	const [isGoalCompleted, setGoalCompleted] = useState(false);

	useEffect(() => {
		let currentGoalValue;

		switch (goalType) {
			case "fitness":
				currentGoalValue = steps >= 4000 || workout >= 30;
				break;
			case "health":
				currentGoalValue = calories >= 1900 && weight > 0;
				// find a way to make weight only need to be inputed weekly
				break;
			case "mind":
				currentGoalValue = meditation >= 5;
				break;
			default:
				currentGoalValue = false;
				break;
		}

		setGoalCompleted(currentGoalValue);
	}, [goalType, steps, calories, meditation, weight, workout]);

	return (
		<div>
			<p>
				{goalType} Goal Completed: {isGoalCompleted ? "Yes" : "No"}
			</p>
		</div>
	);
}

export default MonstersInternalGoalTracker;
