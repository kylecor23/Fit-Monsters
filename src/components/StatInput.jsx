import React, { useContext, useState } from "react";
import StatsContext from "./StatsContex";

const StepsInputField = ({ activity, onClose, triggerJumpAnimation }) => {
	const { updateStats } = useContext(StatsContext);
	const [value, setValue] = useState("");

	const handleInputChange = (event) => {
		const newValue = event.target.value.replace(/\D/, "");
		setValue(newValue);
	};

	const handleSubmit = (event) => {
		console.log("Submitting form...");
		event.preventDefault();
		updateStats(activity, parseInt(value, 10) || 0); // Update stats context
		setValue("");
		triggerJumpAnimation();
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<label htmlFor={`${activity}Input`}>{`Enter ${activity}:`}</label>
				<input
					type="text"
					id={`${activity}Input`}
					value={value}
					onChange={handleInputChange}
				/>
				<button className="modalButton" type="submit">
					Submit
				</button>
			</form>
		</div>
	);
};

export default StepsInputField;
