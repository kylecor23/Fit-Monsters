import React, { useState, useContext, useEffect } from "react";
import StatsContext from "./StatsContext";
import Modal from "./Modal";

const JournalEntryInput = ({ onClose, triggerJumpAnimation }) => {
	const { updateStats } = useContext(StatsContext);
	const [journalEntry, setJournalEntry] = useState("");
	const [viewLastEntry, setViewLastEntry] = useState(false);
	const [lastEntry, setLastEntry] = useState("");

	useEffect(() => {
		const entry = localStorage.getItem("lastJournalEntry");
		if (entry) {
			setLastEntry(entry);
		}
	}, []);

	const handleInputChange = (event) => {
		setJournalEntry(event.target.value);
	};

	const handleJournalSubmit = (event) => {
		event.preventDefault();
		updateStats("journal", journalEntry);
		localStorage.setItem("lastJournalEntry", journalEntry);
		setLastEntry(journalEntry);
		setJournalEntry("");
		triggerJumpAnimation();
		if (onClose) onClose();
	};

	const toggleViewLastEntry = () => {
		setViewLastEntry(!viewLastEntry);
	};

	return (
		<>
			<Modal show={true} onClose={onClose}>
				<form onSubmit={handleJournalSubmit}>
					<label htmlFor="journalEntry">Write your daily journal:</label>
					<textarea
						id="journalEntry"
						value={journalEntry}
						onChange={handleInputChange}
					/>
					<button className="modalButton" type="submit">
						Submit Journal Entry
					</button>
				</form>
				<button className="modalButton" onClick={toggleViewLastEntry}>
					{viewLastEntry ? "Hide Last Entry" : "View Last Entry"}
				</button>
				{viewLastEntry && lastEntry && (
					<div>
						<h3>Last Journal Entry:</h3>
						<p>{lastEntry}</p>
					</div>
				)}
			</Modal>
		</>
	);
};

export default JournalEntryInput;
