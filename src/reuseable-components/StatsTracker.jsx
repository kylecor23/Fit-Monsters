import React, { useState } from "react";
import StatsContext from "./StatsContex";

const StatsProvider = ({ children }) => {
	const [stats, setStats] = useState({
		steps: 0,
		calories: 0,
	});

	const updateStats = (newStats) => {
		setStats((prevStats) => {
			const updatedStats = { ...prevStats, ...newStats };
			console.log("Updated Stats:", updatedStats);
			return updatedStats;
		});
	};

	return (
		<StatsContext.Provider value={{ stats, updateStats }}>
			{children}
		</StatsContext.Provider>
	);
};

export { StatsProvider, StatsContext };
