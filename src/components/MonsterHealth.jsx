import React, { useContext, useState, useEffect } from "react";
import Modal from "./Modal";
import { StatsContext } from "../components/StatsTracker";

function MonstersInternalGoalTracker({ goalType, progress, children }) {
	const { steps, workout, calories, meditation, weight } =
		useContext(StatsContext);
	const [isGoalCompleted, setGoalCompleted] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [overlayImage, setOverlayImage] = useState("");

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
				currentGoalValue = meditation >= 5;
				break;
			default:
				currentGoalValue = false;
				break;
		}
		setGoalCompleted(currentGoalValue);
	}, [goalType, steps, workout, calories, meditation, weight]);

	const openModal = () => {
		setShowModal(true);
	};

	const closeModal = () => {
		setShowModal(false);
	};

	return (
		<div>
			<div onClick={openModal}>
				<div className="progress-container">
					<div className="progress">
						{overlayImage && (
							<img className="overlay-image" src={overlayImage} alt="Overlay" />
						)}
					</div>
				</div>
				<p>
					{goalType} Goal Completed: {isGoalCompleted ? "Yes" : "No"}
				</p>
			</div>
			{showModal && <Modal onClose={closeModal}>{children}</Modal>}
		</div>
	);
}

export default MonstersInternalGoalTracker;
