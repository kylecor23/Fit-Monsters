import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import MonstersInternalGoalTracker from "../components/MonsterInternalGoal";
import StatsContext from "../components/StatsContex";
import StepsInputField from "../components/StatInput";
import JournalEntryInput from "../components/Journal.JSX";
import MeditationTimer from "../components/MeditationTimer";

export default function DashBoard() {
	const { steps, calories, meditation, journal } = useContext(StatsContext);
	const [showJournalModal, setShowJournalModal] = useState(false);
	const [showMeditationModal, setShowMeditationModal] = useState(false);

	const toggleJournalModal = () => {
		setShowJournalModal(!showJournalModal);
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
				<aside className="nav">
					<header>
						<h1>Fit Monsters</h1>
					</header>
					<ul>
						<li>
							<Link to="/dashboard">Home</Link>
						</li>
						<li>
							<Link to="/stats">Stats</Link>
						</li>
						<li>
							<Link to="/challenges">Challenges</Link>
						</li>
					</ul>
				</aside>
				<main className="dashboard">
					<div className="dasboard">
						<img
							src="https://media.istockphoto.com/id/1486708389/vector/cute-ghost-mascot-illustration-doing-weightlifting-illustration-of-a-ghost-doing-sports.jpg?s=612x612&w=0&k=20&c=e1aWV1pywLvXYqJcgiBz8zw1YciDGEvZ8cLHoE6uUR0="
							alt="fit monster"
						/>
					</div>
					<div className="challenges">
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
