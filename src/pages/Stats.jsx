import React, { useContext, useState } from "react";
import StatsContext from "../reuseable-components/StatsContex";

const StepsInputField = () => {
	const { stats, updateStats } = useContext(StatsContext);
	const [steps, setSteps] = useState("");

	const handleInputChange = (event) => {
		const value = event.target.value.replace(/\D/, "");
		setSteps(value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		updateStats({ steps: parseInt(steps, 10) || 0 });
		setSteps(""); // Clear the input field after submission
	};

	return (
		<form onSubmit={handleSubmit}>
			<label htmlFor="stepsInput">Enter steps:</label>
			<input
				type="text"
				id="stepsInput"
				value={steps}
				onChange={handleInputChange}
			/>
			<button type="submit">Submit</button>
		</form>
	);
};

export default StepsInputField;
