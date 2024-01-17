import React, { useContext, useState, useEffect } from "react";
import Modal from "./Modal";
import { StatsContext } from "../components/StatsTracker";

function MonstersInternalGoalTracker({ goalType, progress, children }) {
	const { steps, workout, calories, meditation, weight } =
		useContext(StatsContext);
	const [isGoalCompleted, setGoalCompleted] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [inputValue, setInputValue] = useState("");

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
	}, [goalType, steps, workout, calories, meditation, weight]);

	const openModal = () => {
		setShowModal(true);
	};

	const closeModal = () => {
		setShowModal(false);
	};

	const handleInputChange = (e) => {
		setInputValue(e.target.value);
	};

	return (
		<div>
			<div onClick={openModal}>
				<div className="progress-container">
					<div className="progress"></div>
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
