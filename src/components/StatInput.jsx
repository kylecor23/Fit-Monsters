import { useContext, useEffect, useState } from "react";
import StatsContext from "./StatsContex";

const StepsInputField = ({ activity }) => {
	const { updateStats } = useContext(StatsContext);
	const [value, setValue] = useState("");

	const handleInputChange = (event) => {
		const newValue = event.target.value.replace(/\D/, "");
		setValue(newValue);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(activity, parseInt(value, 10) || 0);
		updateStats(activity, parseInt(value, 10) || 0);
		if (value !== "") {
			setValue("");
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<label htmlFor={`${activity}Input`}>Enter {activity}:</label>
			<input
				type="text"
				id={`${activity}Input`}
				value={value}
				onChange={handleInputChange}
			/>
			<button type="submit">Submit</button>
		</form>
	);
};

export default StepsInputField;
