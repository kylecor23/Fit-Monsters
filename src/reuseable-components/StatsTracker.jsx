import { useState, useEffect } from "react";
import StatsContext from "./StatsContex";

const StatsProvider = ({ children }) => {
  const [stats, setStats] = useState({
    steps: 0,
    calories: 0,
  });

  const updateStats = (newStats) => {
    setStats((prevStats) => {
      const updatedStats = { ...prevStats, ...newStats };
      return updatedStats;
    });
  };

  useEffect(() => {
    return () => {
      console.log("StatsProvider is unmounting");
    };
  }, []);

  return (
    <StatsContext.Provider value={{ stats, updateStats }}>
      {children}
    </StatsContext.Provider>
  );
};

export { StatsProvider, StatsContext };
