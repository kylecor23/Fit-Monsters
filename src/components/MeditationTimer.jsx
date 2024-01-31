import React, { useState, useEffect } from "react";
import StepsInputField from "./StatInput";
import { useContext } from "react";
import StatsContext from "./StatsContex";

const MeditationTimer = ({ onClose }) => {
	const [duration, setDuration] = useState(5); // Default duration is 5 minutes
	const [isTimerStarted, setIsTimerStarted] = useState(false);
	const [timer, setTimer] = useState(duration * 60);
	const { updateStats } = useContext(StatsContext);

	const handleInputChange = (event) => {
		const inputValue = event.target.value;
		setDuration(inputValue); // Update the duration state

		// Only update the timer if the input value is a valid number
		if (!isNaN(inputValue)) {
			setTimer(Math.max(1, parseInt(inputValue, 10)) * 60);
		}
	};

	const handleStartTimer = () => {
		setIsTimerStarted(true);
	};

	useEffect(() => {
		let interval;

		if (isTimerStarted && timer > 0) {
			interval = setInterval(() => {
				setTimer((prevTimer) => prevTimer - 1);
			}, 1000);
		} else if (timer === 0) {
			handleTimerComplete();
		}

		return () => {
			clearInterval(interval);
		};
	}, [isTimerStarted, timer]);

	const handleTimerComplete = () => {
		setIsTimerStarted(false);
		onClose();

		updateStats("meditation", duration);
	};

	const formattedTimer = `${Math.floor(timer / 60)
		.toString()
		.padStart(2, "0")}:${(timer % 60).toString().padStart(2, "0")}`;

	return (
		<div>
			<label htmlFor="meditationDuration">
				Set meditation duration (minutes):
			</label>
			<input
				type="number"
				id="meditationDuration"
				value={duration}
				min={1}
				onChange={handleInputChange}
			/>
			{!isTimerStarted && (
				<button onClick={handleStartTimer}>Start Meditation</button>
			)}
			{isTimerStarted && <div>{formattedTimer}</div>}
			{timer === 0 && (
				<StepsInputField activity="meditation" taskType="meditation" />
			)}
		</div>
	);
};

export default MeditationTimer;
