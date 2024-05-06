import React, { useContext, useState, useRef } from "react";
import MonstersInternalGoalTracker from "../components/MonsterInternalGoal";
import StatsContext from "../components/StatsContext";
import StepsInputField from "../components/StatInput";
import JournalEntryInput from "../components/Journal.JSX";
import MeditationTimer from "../components/MeditationTimer";
import Monster from "../components/monster";
import SideNav from "../components/AsideNav";

export default function DashBoard() {
	const { steps, calories, meditation, journal } = useContext(StatsContext);
	const [showJournalModal, setShowJournalModal] = useState(false);
	const [showMeditationModal, setShowMeditationModal] = useState(false);
	const monsterRef = useRef(); // Create a ref for the Monster component

	const triggerJumpAnimation = () => {
		if (monsterRef.current) {
			monsterRef.current.handleJump(); // Call handleJump to trigger the jump animation
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
				<div className="monster">
					<Monster ref={monsterRef} />
				</div>
				<div className="statusBar">
					<MonstersInternalGoalTracker
						goalType="fitness"
						progress={fitnessProgress}
						triggerJumpAnimation={triggerJumpAnimation}
						id="fitness"
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
			</main>
		</div>
	);
}
