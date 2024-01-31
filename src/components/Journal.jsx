import React, { useState, useContext } from "react";
import StatsContext from "./StatsContex";

const JournalEntryInput = () => {
	const [journalEntry, setJournalEntry] = useState("");
	const { updateStats } = useContext(StatsContext);

	const handleInputChange = (event) => {
		setJournalEntry(event.target.value);
	};

	const handleJournalSubmit = (event) => {
		event.preventDefault();
		updateStats("journal", journalEntry);
		setJournalEntry("");
	};

	return (
		<form onSubmit={handleJournalSubmit}>
			<label htmlFor="journalEntry">Write your daily journal:</label>
			<textarea
				id="journalEntry"
				value={journalEntry}
				onChange={handleInputChange}
			/>
			<button type="submit">Submit Journal Entry</button>
		</form>
	);
};

export default JournalEntryInput;
