import React, {
	useContext,
	useState,
	useEffect,
	forwardRef,
	useRef,
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
	{
		name: "stageMonster",
		threshold: 100000,
		static: "/dragonNormal.gif",
		bounce: "/dragonSquat.gif",
		wiggle: "/dragonSquat.gif",
		transition: "/eggHatching.gif",
		meditation: "/dragonMeditation.gif",
	},
];

// Helper function to find the current stage based on step count
const getCurrentStage = (steps) => {
	return (
		stages
			.slice()
			.reverse()
			.find((stage) => steps >= stage.threshold) || stages[0]
	);
};

const Monster = forwardRef((props, ref) => {
	const { steps, isMeditating } = useContext(StatsContext);
	const [currentStage, setCurrentStage] = useState(getCurrentStage(steps));
	const [imageSrc, setImageSrc] = useState(currentStage.static);
	const transitionRef = useRef(null);

	useEffect(() => {
		const targetStage = getCurrentStage(steps);
		if (targetStage !== currentStage) {
			queueTransitions(currentStage, targetStage);
		}
	}, [steps]);

	const queueTransitions = (fromStage, toStage) => {
		const fromIndex = stages.indexOf(fromStage);
		const toIndex = stages.indexOf(toStage);
		let delay = 0;

		for (let i = fromIndex + 1; i <= toIndex; i++) {
			setTimeout(() => {
				playAnimation("transition", stages[i]);
				if (i === toIndex) {
					setCurrentStage(stages[i]);
					setImageSrc(stages[i].static);
				}
			}, delay);
			delay += 3500;
		}
	};

	const playAnimation = (type, stage) => {
		setImageSrc(stage[type]);
		clearTimeout(transitionRef.current);
		transitionRef.current = setTimeout(() => {
			setImageSrc(stage.static);
		}, 3000);
	};

	useEffect(() => {
		if (isMeditating && currentStage.name === "stageMonster") {
			setImageSrc(currentStage.meditation);
		} else {
			setImageSrc(currentStage.static);
		}
	}, [isMeditating, currentStage]);

	useImperativeHandle(ref, () => ({
		handleJump: () => playAnimation("bounce", currentStage),
		playMeditationAnimation: () => {
			if (currentStage.name === "stageMonster") {
				setImageSrc(currentStage.meditation);
			}
		},
		endMeditationAnimation: () => setImageSrc(currentStage.static),
	}));

	return (
		<div
			className="monster"
			onClick={() => playAnimation("wiggle", currentStage)}
		>
			<img src={imageSrc} alt="Monster" className="monster-img" />
		</div>
	);
});

export default Monster;
