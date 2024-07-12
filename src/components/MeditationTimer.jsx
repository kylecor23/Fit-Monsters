import React, { useState, useEffect, useContext } from "react";
import Modal from "./Modal";
import StatsContext from "./StatsContext";
import Monster from "./monster";

function formatTime(timer) {
	const minutes = Math.floor(timer / 60);
	const seconds = timer % 60;
	return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
		2,
		"0"
	)}`;
}

const MeditationTimer = ({ showModal, onClose }) => {
	const [duration, setDuration] = useState(5);
	const [timer, setTimer] = useState(duration * 60);
	const [isTimerStarted, setIsTimerStarted] = useState(false);
	const { updateStats, startMeditation, endMeditation } =
		useContext(StatsContext);
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
		startMeditation(); // Start meditation via context
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
		endMeditation(); // End meditation via context
	};

	const handleCloseMeditation = () => {
		if (isTimerStarted) {
			setIsTimerStarted(false);
			setTimer(duration * 60);
		}
		endMeditation();
		onClose();
	};

	useEffect(() => {
		let interval;
		if (isTimerStarted && timer > 0 && !isPaused) {
			interval = setInterval(() => {
				setTimer((prevTimer) => prevTimer - 1);
			}, 1000);
		} else if (timer === 0) {
			handleStopTimer();
		}

		return () => clearInterval(interval);
	}, [isTimerStarted, timer, isPaused]);

	const ringFillPercentage = (timer / (duration * 60)) * 100;

	return (
		<Modal onClose={handleCloseMeditation} show={showModal}>
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
				<Monster />
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
						<button className="modalButton" onClick={handleStartTimer}>
							Start Meditation
						</button>
					</div>
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
			</div>
		</Modal>
	);
};

export default MeditationTimer;
