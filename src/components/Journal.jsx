import React, { useState, useContext, useEffect } from "react";
import StatsContext from "./StatsContex";
import Modal from "./Modal";

const JournalEntryInput = ({ onClose }) => {
	const [journalEntry, setJournalEntry] = useState("");
	const { updateStats } = useContext(StatsContext);

	const handleInputChange = (event) => {
		setJournalEntry(event.target.value);
	};

	const handleJournalSubmit = (event) => {
		event.preventDefault();
		updateStats("journal", journalEntry);
		setJournalEntry("");
		onClose();
	};

	const handleOverlayClick = (event) => {
		if (event.target.classList.contains("modal-overlay")) {
			onClose();
		}
	};

	return (
		<Modal show={true} onClose={onClose}>
			<div className="journal" onClick={handleOverlayClick}>
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
				<button className="modalButton" onClick={onClose}>
					Close
				</button>
			</div>
		</Modal>
	);
};

export default JournalEntryInput;
