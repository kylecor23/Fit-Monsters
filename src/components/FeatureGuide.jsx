import React, { useContext, useState, useEffect, useRef } from "react";
import StatsContext from "./StatsContext";

const FeatureGuide = () => {
	const { showGuide, toggleGuide } = useContext(StatsContext);
	const [step, setStep] = useState(0);
	const lastTarget = useRef(null);

	const guideContent = [
		{
			title: "Welcome to Fitness Monsters!",
			message: "Let's walk you through the app.",
		},
		{
			title: "Track Your Steps",
			message: "Here you can see how many steps you've taken each day.",
			targetClass: "fitness progress-container",
		},
		{
			title: "Monitor Your Calories",
			message: "Keep track of your calorie intake to meet your fitness goals.",
			target: "calories",
		},
	];

	const highlightElement = (element) => {
		if (lastTarget.current) {
			lastTarget.current.style.backgroundColor = "";
			lastTarget.current.classList.remove("highlighted"); // Clean up additional class if any
		}
		if (element) {
			element.style.backgroundColor = "yellow";
			lastTarget.current = element;
		}
	};

	useEffect(() => {
		const targetElement = guideContent[step].target
			? document.getElementById(guideContent[step].target)
			: document.querySelector(`.${guideContent[step].targetClass}`);

		highlightElement(targetElement);

		return () => {
			if (lastTarget.current) {
				lastTarget.current.style.backgroundColor = "";
				lastTarget.current.classList.remove("highlighted");
			}
		};
	}, [step, showGuide]);

	const nextStep = () => {
		if (step < guideContent.length - 1) {
			setStep(step + 1);
		} else {
			toggleGuide();
		}
	};

	const closeGuide = () => {
		setStep(0);
		toggleGuide();
	};

	if (!showGuide) return null;

	return (
		<div
			className="modal"
			style={{
				position: "fixed",
				top: "50%",
				left: "50%",
				transform: "translate(-50%, -50%)",
				width: "300px",
				minHeight: "100px",
				backgroundColor: "rgba(0,0,0,0.8)",
				padding: "20px",
				borderRadius: "10px",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				zIndex: 1050,
				color: "white",
			}}
		>
			<h1>{guideContent[step].title}</h1>
			<p>{guideContent[step].message}</p>
			<button onClick={nextStep}>
				{step < guideContent.length - 1 ? "Next" : "Finish"}
			</button>
			<button onClick={closeGuide}>Close Guide</button>
		</div>
	);
};

export default FeatureGuide;
