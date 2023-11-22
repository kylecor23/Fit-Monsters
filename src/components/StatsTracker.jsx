import { useState } from "react";
import StatsContext from "./StatsContex";

const StatsProvider = ({ children }) => {
	// const [stats, setStats] = useState({
	// 	steps: 0,
	// 	calories: 0,
	// });

	const [steps, setSteps] = useState(0);

	const [calories, setCalories] = useState(0);

	const updateStats = (activityName, newValue) => {
		if (activityName === "calories") {
			setCalories(newValue);
		}
		if (activityName === "steps") {
			setSteps(newValue);
		}
	};
	// const updateStats = (newStats) => {
	// 	setStats((prevStats) => {
	// 		const updatedStats = { ...prevStats, ...newStats };
	// 		console.log(prevStats, newStats, updatedStats);
	// 		return updatedStats;
	// 	});
	// };

	return (
		<StatsContext.Provider value={{ calories, steps, updateStats }}>
			{children}
		</StatsContext.Provider>
	);
};

export { StatsProvider, StatsContext };
