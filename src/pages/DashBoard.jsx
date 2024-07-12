import React, { useContext, useState, useRef } from "react";
import MonstersInternalGoalTracker from "../components/MonsterInternalGoal";
import StatsContext from "../components/StatsContext";
import StepsInputField from "../components/StatInput";
import JournalEntryInput from "../components/Journal.JSX";
import MeditationTimer from "../components/MeditationTimer";
import Monster from "../components/monster";
import SideNav from "../components/AsideNav";
import FeatureGuide from "../components/FeatureGuide";

export default function DashBoard() {
	const { steps, calories, meditation, journal } = useContext(StatsContext);
	const [showJournalModal, setShowJournalModal] = useState(false);
	const [showMeditationModal, setShowMeditationModal] = useState(false);
	const monsterRef = useRef();

	const triggerJumpAnimation = () => {
		if (monsterRef.current) {
			monsterRef.current.handleJump();
		}
	};

	const toggleJournalModal = () => {
		setShowJournalModal(!showJournalModal);
	};

	const handleCloseJournalModal = () => {
		setShowJournalModal(false);
	};

	const toggleMeditationModal = () => {
		setShowMeditationModal(!showMeditationModal);
	};

	const fitnessProgress = Math.min((steps / 8000) * 100, 100);
	const healthProgress = Math.min((calories / 2500) * 100, 100);
	const mindProgress = Math.min((meditation / 10) * 100, 100);

	return (
		<div className="container">
			<SideNav />
			<main className="dashboard">
				<div className="monster" id="monster">
					<Monster ref={monsterRef} />
				</div>
				<div className="statusBar">
					<MonstersInternalGoalTracker
						goalType="fitness"
						progress={fitnessProgress}
						triggerJumpAnimation={triggerJumpAnimation}
						data-guide="fitness-progress"
					>
						<StepsInputField
							activity="steps"
							triggerJumpAnimation={triggerJumpAnimation}
						/>
					</MonstersInternalGoalTracker>

					<MonstersInternalGoalTracker
						goalType="health"
						progress={healthProgress}
						triggerJumpAnimation={triggerJumpAnimation}
						data-guide="health-progress"
					>
						<StepsInputField
							activity="calories"
							triggerJumpAnimation={triggerJumpAnimation}
						/>
						<StepsInputField
							activity="weight"
							triggerJumpAnimation={triggerJumpAnimation}
						/>
					</MonstersInternalGoalTracker>

					<MonstersInternalGoalTracker
						goalType="mind"
						progress={mindProgress}
						triggerJumpAnimation={triggerJumpAnimation}
						data-guide="mind-progress"
					>
						<button className="modalButton" onClick={toggleJournalModal}>
							Open Journal
						</button>
						<button className="modalButton" onClick={toggleMeditationModal}>
							Open Meditation
						</button>
						{showJournalModal && (
							<JournalEntryInput
								showModal={showJournalModal}
								onClose={handleCloseJournalModal}
								triggerJumpAnimation={triggerJumpAnimation}
							/>
						)}
						{showMeditationModal && (
							<MeditationTimer
								showModal={showMeditationModal}
								onClose={toggleMeditationModal}
								triggerJumpAnimation={triggerJumpAnimation}
							/>
						)}
					</MonstersInternalGoalTracker>
				</div>
				<FeatureGuide />
			</main>
		</div>
	);
}
