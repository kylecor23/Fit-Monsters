import React, { useContext, useEffect, useState } from "react";
import StatsContext from "./StatsContex";

const StepsInputField = ({ activity, onTaskComplete, taskType }) => {
	const { updateStats } = useContext(StatsContext);
	const [value, setValue] = useState("");

	const handleInputChange = (event) => {
		const newValue = event.target.value.replace(/\D/, "");
		setValue(newValue);
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		if (onTaskComplete) {
			// If onTaskComplete is provided, consider it a task check
			onTaskComplete();
		} else {
			// Otherwise, treat it as numeric input
			updateStats(activity, parseInt(value, 10) || 0);
			setValue("");
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<label htmlFor={`${activity}Input`}>
				{onTaskComplete
					? `Check if ${taskType || activity} is done:`
					: `Enter ${activity}:`}
			</label>
			{onTaskComplete ? (
				<input
					type="text"
					id={`${activity}Input`}
					value={value}
					onChange={handleInputChange}
				/>
			) : (
				<input
					type="text"
					id={`${activity}Input`}
					value={value}
					onChange={handleInputChange}
				/>
			)}
			<button type="submit">Submit</button>
		</form>
	);
};

export default StepsInputField;
