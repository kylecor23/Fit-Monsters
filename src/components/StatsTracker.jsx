import { useState } from "react";
import StatsContext from "./StatsContext";

const StatsProvider = ({ children }) => {
	const [steps, setSteps] = useState(0);
	const [calories, setCalories] = useState(0);
	const [weight, setWeight] = useState(0);
	const [meditation, setMeditation] = useState(0);
	const [journal, setJournal] = useState("");
	const [showGuide, setShowGuide] = useState(false);

	const updateStats = (activityName, newValue) => {
		console.log(`Updating ${activityName} to ${newValue}`);
		if (activityName === "calories") {
			setCalories(newValue);
		} else if (activityName === "steps") {
			setSteps(newValue);
		} else if (activityName === "weight") {
			setWeight(newValue);
		} else if (activityName === "meditation") {
			setMeditation(newValue);
		} else if (activityName === "journal") {
			setJournal(newValue);
		}
	};

	const toggleGuide = () => {
		setShowGuide((prev) => {
			console.log("Toggling guide from", prev, "to", !prev);
			return !prev;
		});
	};

	return (
		<StatsContext.Provider
			value={{
				steps,
				calories,
				weight,
				meditation,
				journal,
				updateStats,
				showGuide,
				toggleGuide,
			}}
		>
			{children}
		</StatsContext.Provider>
	);
};

export { StatsProvider, StatsContext };
