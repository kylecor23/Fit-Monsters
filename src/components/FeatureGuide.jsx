import React, { useContext, useState, useEffect, useRef } from "react";
import StatsContext from "./StatsContext";

const FeatureGuide = () => {
	const { showGuide, toggleGuide } = useContext(StatsContext);
	const [step, setStep] = useState(0);
	const guideRef = useRef(null);
	const retryInterval = useRef(null);
	const maxRetries = 10;

	const guideContent = [
		{
			title: "Welcome to Fitness Monsters!",
			message: "Let's walk you through the app.",
		},
		{
			title: "Your Fitness Monster",
			message:
				"This is your Fitness Monster. They will grow and evolve with your fitness journey.",
			targetId: "monster",
		},
		{
			title: "Fitness Progress Tracker",
			message: "Click here to log your fitness information like steps.",
			targetDataGuide: "fitness-progress",
		},
		{
			title: "Health Progress Tracker",
			message:
				"Click here to log items like your weight and daily calories consumed.",
			targetDataGuide: "health-progress",
		},
		{
			title: "Mind Progress Tracker",
			message:
				"Click here to log your mental health activities, complete journal entries, and meditation exercises.",
			targetDataGuide: "mind-progress",
		},
		{
			title: "Navigation Menu",
			message:
				"Use the options on the navigation menu to see graphs tracking your stats or check out challenges for you to beat!",
			targetClass: "nav",
		},
		{ title: "Conclusion", message: "Thank you for checking out the app!" },
	];

	const positionGuide = (element) => {
		if (guideRef.current && element) {
			const rect = element.getBoundingClientRect();
			console.log("Positioning guide for:", element);
			guideRef.current.style.top = `${rect.bottom + window.scrollY + 10}px`;
			guideRef.current.style.left = `${rect.left + window.scrollX}px`;
		}
	};

	const findElement = () => {
		const targetElement = guideContent[step].targetId
			? document.getElementById(guideContent[step].targetId)
			: guideContent[step].targetDataGuide
			? document.querySelector(
					`[data-guide="${guideContent[step].targetDataGuide}"]`
			  )
			: guideContent[step].targetClass
			? document.querySelector(`.${guideContent[step].targetClass}`)
			: null;

		if (targetElement) {
			positionGuide(targetElement);
			clearInterval(retryInterval.current);
		} else {
			console.log("Target element not found for step:", step);
		}
	};

	useEffect(() => {
		if (showGuide) {
			let retries = 0;
			retryInterval.current = setInterval(() => {
				findElement();
				retries++;
				if (retries >= maxRetries) {
					clearInterval(retryInterval.current);
				}
			}, 100);
		}

		return () => clearInterval(retryInterval.current);
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
		<div ref={guideRef} className="guide-modal">
			<div className="arrow"></div>
			<h1>{guideContent[step].title}</h1>
			<p>{guideContent[step].message}</p>
			<button className="modalButton" onClick={nextStep}>
				{step < guideContent.length - 1 ? "Next" : "Finish"}
			</button>
			<button className="modalButton" onClick={closeGuide}>
				Close Guide
			</button>
		</div>
	);
};

export default FeatureGuide;
