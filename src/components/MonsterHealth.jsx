import React, { useContext, useState, useEffect } from "react";
import { StatsContext } from "../components/StatsTracker";

function MonstersInternalGoalTracker({ goalType }) {
	const { steps, workout, calories, meditation, weight } =
		useContext(StatsContext);
	const [isGoalCompleted, setGoalCompleted] = useState(false);
	const [progress, setProgress] = useState(0);

	const radius = 58;
	const stroke = 4;
	const normalizedRadius = radius - stroke * 2;
	const circumference = normalizedRadius * 2 * Math.PI;

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

	const strokeDashoffset = circumference - (progress / 100) * circumference;

	return (
		<div className="progress-container">
			<svg height={radius * 2} width={radius * 2} className="progress-ring">
				<circle
					className="progress-ring__circle"
					strokeWidth={stroke}
					strokeDasharray={circumference + " " + circumference}
					style={{ strokeDashoffset }}
					r={normalizedRadius}
					cx={radius}
					cy={radius}
				/>
			</svg>
			{/* <img
				src="path-to-your-image.jpg" // Replace with your image path
				className="center-image"
				alt="Center Image"
			/> */}
			<p>
				{goalType} Goal Completed: {isGoalCompleted ? "Yes" : "No"}
			</p>
		</div>
	);
}

export default MonstersInternalGoalTracker;
