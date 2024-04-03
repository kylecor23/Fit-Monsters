import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import MonstersInternalGoalTracker from "../components/MonsterInternalGoal";
import StatsContext from "../components/StatsContex";
import StepsInputField from "../components/StatInput";
import JournalEntryInput from "../components/Journal.JSX";
import MeditationTimer from "../components/MeditationTimer";
import Monster from "../components/monster";
import SideNav from "../components/AsideNav";

export default function DashBoard() {
	const { steps, calories, meditation, journal } = useContext(StatsContext);
	const [showJournalModal, setShowJournalModal] = useState(false);
	const [showMeditationModal, setShowMeditationModal] = useState(false);
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
		<>
			<div className="container">
				<SideNav />
				<main className="dashboard">
					<div className="monster">
						<h1>hey</h1>
						<Monster />
					</div>
					<div className="statusBar">
						<MonstersInternalGoalTracker
							goalType="fitness"
							progress={fitnessProgress}
						>
							<StepsInputField activity="steps" />
						</MonstersInternalGoalTracker>

						<MonstersInternalGoalTracker
							goalType="health"
							progress={healthProgress}
						>
							<StepsInputField activity="calories" />
							<StepsInputField activity="weight" />
						</MonstersInternalGoalTracker>

						<MonstersInternalGoalTracker
							goalType="mind"
							progress={mindProgress}
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
									onClose={toggleJournalModal}
								/>
							)}

							{showMeditationModal && (
								<MeditationTimer
									showModal={showMeditationModal}
									onClose={toggleMeditationModal}
								/>
							)}
						</MonstersInternalGoalTracker>
					</div>
				</main>
			</div>
		</>
	);
}
