import React, { useState, useEffect } from "react";
import StepsInputField from "./StatInput";
import { useContext } from "react";
import StatsContext from "./StatsContex";
import Modal from "./Modal";

function formatTime(timer) {
	const minutes = Math.floor(timer / 60);
	const seconds = timer % 60;
	return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
		2,
		"0"
	)}`;
}

const MeditationTimer = ({ showModal, onClose }) => {
	const [duration, setDuration] = useState(5); // Default duration is 5 minutes
	const [isTimerStarted, setIsTimerStarted] = useState(false);
	const [timer, setTimer] = useState(duration * 60);
	const { updateStats } = useContext(StatsContext);
	const [showTimerInput, setShowTimerInput] = useState(true);
	const [isPaused, setIsPaused] = useState(false);
	const [isCloseVisible, setIsCloseVisible] = useState(true);

	const handleInputChange = (event) => {
		const inputValue = event.target.value;
		setDuration(inputValue);

		if (!isNaN(inputValue)) {
			setTimer(Math.max(1, parseInt(inputValue, 10)) * 60);
		}
	};

	const handleStartTimer = () => {
		setIsTimerStarted(true);
		setShowTimerInput(false);
		setIsCloseVisible(false);
	};

	const handlePauseTimer = () => {
		setIsPaused(true);
		setIsTimerStarted(false);
	};

	const handleResumeTimer = () => {
		setIsPaused(false);
		setIsTimerStarted(true);
	};

	const handleStopTimer = () => {
		setIsTimerStarted(false);
		setTimer(duration * 60);
		setShowTimerInput(true);
		setIsPaused(false);
		setIsCloseVisible(true);
	};

	const handleCloseMeditation = () => {
		onClose();
	};

	useEffect(() => {
		let interval;

		if (isTimerStarted && timer > 0 && !isPaused) {
			interval = setInterval(() => {
				setTimer((prevTimer) => prevTimer - 1);
			}, 1000);
		} else if (timer === 0) {
			handleTimerComplete();
		}

		return () => {
			clearInterval(interval);
		};
	}, [isTimerStarted, timer, isPaused]);

	const handleTimerComplete = () => {
		setIsTimerStarted(false);
		onClose();
		const actualDuration = duration - Math.floor(timer / 60);
		updateStats("meditation", actualDuration);
	};

	const ringFillPercentage = (timer / (duration * 60)) * 100;

	return (
		<Modal onClose={onClose} show={showModal}>
			<div className="timer-container">
				<div className="timer">
					<div className="timer-ring">
						<svg className="progress-ring" width="200" height="200">
							<circle
								className="progress-ring__circle"
								stroke="#0f0"
								strokeWidth="10"
								fill="transparent"
								r="70"
								cx="100"
								cy="100"
								style={{ "--percentage": ringFillPercentage }}
							/>
						</svg>
					</div>
					<div className="digital-clock">{formatTime(timer)}</div>
				</div>
				{showTimerInput && (
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
					</div>
				)}
				{showTimerInput && !isTimerStarted && (
					<button className="modalButton" onClick={handleStartTimer}>
						Start Meditation
					</button>
				)}
				{!showTimerInput && isTimerStarted && !isPaused && (
					<button className="modalButton" onClick={handlePauseTimer}>
						Pause
					</button>
				)}
				{!showTimerInput && isPaused && (
					<button className="modalButton" onClick={handleResumeTimer}>
						Resume
					</button>
				)}
				{!showTimerInput && (
					<button className="modalButton" onClick={handleStopTimer}>
						Stop
					</button>
				)}
				{isCloseVisible && (
					<button className="modalButton" onClick={handleCloseMeditation}>
						Close Meditation
					</button>
				)}
				{timer === 0 && (
					<StepsInputField activity="meditation" taskType="meditation" />
				)}
			</div>
		</Modal>
	);
};

export default MeditationTimer;
