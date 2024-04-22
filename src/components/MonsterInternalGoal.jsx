import React, { useContext, useState, useEffect } from "react";
import Modal from "./Modal";
import { StatsContext } from "../components/StatsTracker";

function MonstersInternalGoalTracker({ goalType, progress, children }) {
	const { steps, workout, calories, meditation, weight, journal } =
		useContext(StatsContext);
	const [showModal, setShowModal] = useState(false);
	const [overlayImage, setOverlayImage] = useState("");
	const [fitnessPoints, setFitnessPoints] = useState(5);
	const [healthPoints, setHealthPoints] = useState(5);
	const [mindPoints, setMindPoints] = useState(5);
	const [isGoalCompleted, setGoalCompleted] = useState(false);

	useEffect(() => {
		// Determine overlay image based on goal type
		switch (goalType) {
			case "fitness":
				setOverlayImage("src/assets/strength.png");
				break;
			case "health":
				setOverlayImage("src/assets/heart.png");
				break;
			case "mind":
				setOverlayImage("src/assets/mind.png");
				break;
			default:
				setOverlayImage("");
				break;
		}
	}, [goalType]);

	useEffect(() => {
		let currentGoalValue;
		switch (goalType) {
			case "fitness":
				currentGoalValue = steps >= 4000 || workout >= 30;
				break;
			case "health":
				currentGoalValue = calories >= 1900 && weight > 0;
				break;
			case "mind":
				currentGoalValue = meditation >= 1 || journal !== "";
				break;
			default:
				currentGoalValue = false;
				break;
		}

		setGoalCompleted(currentGoalValue);
	}, [goalType, steps, workout, calories, meditation, weight, journal]);

	// Adjust fitnessPoints, healthPoints, mindPoints based on completion
	useEffect(() => {
		if (isGoalCompleted) {
			switch (goalType) {
				case "fitness":
					setFitnessPoints((prevPoints) => prevPoints + 1);
					break;
				case "health":
					setHealthPoints((prevPoints) => prevPoints + 1);
					break;
				case "mind":
					setMindPoints((prevPoints) => prevPoints + 1);
					break;
				default:
					break;
			}
		} else {
			const interval = setInterval(() => {
				switch (goalType) {
					case "fitness":
						setFitnessPoints((prevPoints) => Math.max(prevPoints - 1, 0));
						break;
					case "health":
						setHealthPoints((prevPoints) => Math.max(prevPoints - 1, 0));
						break;
					case "mind":
						setMindPoints((prevPoints) => Math.max(prevPoints - 1, 0));
						break;
					default:
						break;
				}
			}, 24 * 60 * 60 * 1000);

			return () => clearInterval(interval);
		}
	}, [isGoalCompleted]);

	// Add this function to get the points for each goal type
	const getPointsForGoalType = (goalType) => {
		switch (goalType) {
			case "fitness":
				return fitnessPoints;
			case "health":
				return healthPoints;
			case "mind":
				return mindPoints;
			default:
				return 0;
		}
	};

	return (
		<div>
			<div
				className={`${goalType} progress-container`}
				onClick={() => setShowModal(true)}
			>
				<div className="progress">
					<div className="progress-filled-wrapper">
						<div
							className="progress-filled"
							style={{
								height: `${(getPointsForGoalType(goalType) / 10) * 100}%`, // Adjust based on max points
							}}
						></div>
					</div>
					{overlayImage && (
						<img className="overlay-image" src={overlayImage} alt="Overlay" />
					)}
				</div>
			</div>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>{children}</Modal>
			)}
		</div>
	);
}

export default MonstersInternalGoalTracker;
