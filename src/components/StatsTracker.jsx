import { useState } from "react";
import StatsContext from "./StatsContex";

const StatsProvider = ({ children }) => {
	const [steps, setSteps] = useState(0);
	const [calories, setCalories] = useState(0);
	const [weight, setWeight] = useState(0);
	const [meditation, setMeditation] = useState(0);
	const [journal, setJournal] = useState("");

	const updateStats = (activityName, newValue) => {
		if (activityName === "calories") {
			setCalories(newValue);
		}
		if (activityName === "steps") {
			setSteps(newValue);
		}
		if (activityName === "weight") {
			setWeight(newValue);
		}
		if (activityName === "meditation") {
			setMeditation(newValue);
		}
		if (activityName === "journal") {
			setJournal(newValue);
		}
	};

	return (
		<StatsContext.Provider
			value={{ calories, steps, weight, updateStats, meditation, journal }}
		>
			{children}
		</StatsContext.Provider>
	);
};

export { StatsProvider, StatsContext };
