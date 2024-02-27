import React, { useContext, useState, useEffect } from "react";
import Modal from "./Modal";
import { StatsContext } from "../components/StatsTracker";

function MonstersInternalGoalTracker({ goalType, progress, children }) {
	const { steps, workout, calories, meditation, weight, journal } =
		useContext(StatsContext);
	const [isGoalCompleted, setGoalCompleted] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [overlayImage, setOverlayImage] = useState("");
	const [fitnessPoints, setFitnessPoints] = useState(5);
	const [healthPoints, setHealthPoints] = useState(5);
	const [mindPoints, setMindPoints] = useState(5);

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
				console.log("Mind goal updated:", currentGoalValue);
				break;
			default:
				currentGoalValue = false;
				break;
		}

		console.log("Setting goal completion status:", currentGoalValue);
		setGoalCompleted(currentGoalValue);
	}, [goalType, steps, workout, calories, meditation, weight, journal]);

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
			// Check if the goal is not completed and adjust points at the end of the day
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

	useEffect(() => {
		const maxPoints = 10;
		let percentage;
		switch (goalType) {
			case "fitness":
				percentage = (fitnessPoints / maxPoints) * 100;
				break;
			case "health":
				percentage = (healthPoints / maxPoints) * 100;
				break;
			case "mind":
				percentage = (mindPoints / maxPoints) * 100;
				break;
			default:
				percentage = 0;
				break;
		}
		console.log("Percentage:", percentage);
		document.documentElement.style.setProperty(
			"--percentage",
			`${percentage}%`
		);
	}, [goalType, fitnessPoints, healthPoints, mindPoints]);

	const openModal = () => {
		setShowModal(true);
	};

	const closeModal = () => {
		setShowModal(false);
	};

	return (
		<div>
			<div className={`${goalType} progress-container`} onClick={openModal}>
				<div className="progress">
					<div className="progress-filled-wrapper">
						<div className="progress-filled"></div>
					</div>
					{overlayImage && (
						<img className="overlay-image" src={overlayImage} alt="Overlay" />
					)}
				</div>
			</div>
			{showModal && <Modal onClose={closeModal}>{children}</Modal>}
		</div>
	);
}

export default MonstersInternalGoalTracker;
