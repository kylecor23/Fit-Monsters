import React, {
	useContext,
	useRef,
	useState,
	useEffect,
	forwardRef,
	useImperativeHandle,
} from "react";
import StatsContext from "./StatsContext";

const stages = [
	{
		name: "normal",
		threshold: 0,
		static: "/noCracks.png",
		bounce: "/noCracksBounceOneShot.GIF",
		wiggle: "/noCracksWiggleOneShot.GIF",
	},
	{
		name: "stageOne",
		threshold: 20000,
		static: "/stageOneCracks.PNG",
		bounce: "/stageOneCracksBounceOneShot.gif",
		wiggle: "/stageOneCracksWiggleOneShot.gif",
		transition: "/stageOneCracks.gif",
	},
	{
		name: "stageTwo",
		threshold: 40000,
		static: "/stageTwoCracks.PNG",
		bounce: "/stageTwoCracksBounceOneShot.gif",
		wiggle: "/stageTwoCracksWiggleOneShot.gif",
		transition: "/stageTwoCracks.gif",
	},
	{
		name: "stageThree",
		threshold: 80000,
		static: "/stageThreeCracks.PNG",
		bounce: "/StageThreeCracksBounceOneShot.gif",
		wiggle: "/stageThreeCracksWiggleOneShot.gif",
		transition: "/stageThreeCracks.gif",
	},
];

// Helper function to find the current stage based on step count
const getCurrentStage = (steps) => {
	// Return the highest stage for which the step count exceeds the threshold
	return (
		stages
			.slice()
			.reverse()
			.find((stage) => steps >= stage.threshold) || stages[0]
	);
};

const Monster = forwardRef(({ triggerJumpAnimation }, ref) => {
	const { steps } = useContext(StatsContext);
	const [currentStage, setCurrentStage] = useState(getCurrentStage(0)); // Start at normal
	const [imageSrc, setImageSrc] = useState(currentStage.static);

	useEffect(() => {
		const targetStage = getCurrentStage(steps);
		if (targetStage.name !== currentStage.name) {
			setCurrentStage(targetStage);
			queueTransitions(currentStage, targetStage);
		}
	}, [steps, currentStage]);

	const playAnimation = (type, stage) => {
		setImageSrc(stage[type]);
		setTimeout(() => {
			setImageSrc(stage.static);
		}, 3000);
	};

	const queueTransitions = (fromStage, toStage) => {
		const startIndex = stages.indexOf(fromStage);
		const endIndex = stages.indexOf(toStage);
		const transitionsToPlay = stages.slice(startIndex + 1, endIndex + 1);

		transitionsToPlay.forEach((stage, index) => {
			setTimeout(() => {
				if (stage.transition) {
					playAnimation("transition", stage);
				}
			}, index * 3500); // Each transition is spaced out by 3.5 seconds
		});
	};

	useImperativeHandle(ref, () => ({
		handleJump: () => {
			playAnimation("bounce", currentStage);
		},
	}));

	return (
		<div className="monster">
			<img
				src={imageSrc}
				alt="Monster"
				onClick={() => playAnimation("wiggle", currentStage)}
				className="monster-img"
			/>
		</div>
	);
});

export default Monster;
