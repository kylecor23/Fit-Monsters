import { useContext, useState, useCallback } from "react";
import Popup from "../components/popup-menu";
import { Link } from "react-router-dom";
import MonstersInternalGoalTracker from "../components/MonsterInternalGoal";
import StatsContext from "../components/StatsContex";
import StepsInputField from "../components/StatInput";
import JournalEntryInput from "../components/Journal.JSX";
import MeditationTimer from "../components/MeditationTimer";

export default function DashBoard() {
  const { steps, calories, meditation } = useContext(StatsContext);
  const [showJournalModal, setShowJournalModal] = useState(false);
  const [showMeditationModal, setShowMeditationModal] = useState(false);

  const fitnessProgress = useCallback(
    () => Math.min((steps / 8000) * 100, 100),
    [steps]
  );
  const healthProgress = useCallback(
    () => Math.min((calories / 2500) * 100, 100),
    [calories]
  );
  const mindProgress = useCallback(
    () => Math.min((meditation / 10) * 100, 100),
    [meditation]
  );

  return (
    <>
      <header>
        <h1>Fit Monsters</h1>
        <nav className="nav">
          <Popup>
            <ul>
              <li>
                <Link to="/stats">Stats</Link>
              </li>
              <li>
                <Link to="/challenges">Challenges</Link>
              </li>
            </ul>
          </Popup>
        </nav>
      </header>

      <main>
        <div className="dashboard">
          <h1>dashboard</h1>
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
              <button
                className="modalButton"
                onClick={() => setShowJournalModal(!showJournalModal)}
              >
                Open Journal
              </button>

              <button
                className="modalButton"
                onClick={() => setShowMeditationModal(!showMeditationModal)}
              >
                Open Meditation
              </button>

              {showJournalModal && (
                <JournalEntryInput
                  showModal={showJournalModal}
                  onClose={() => setShowMeditationModal(!showMeditationModal)}
                />
              )}

              {showMeditationModal && (
                <MeditationTimer
                  showModal={showMeditationModal}
                  onClose={() => setShowMeditationModal(!showMeditationModal)}
                />
              )}
            </MonstersInternalGoalTracker>
          </div>
        </div>
      </main>
    </>
  );
}
