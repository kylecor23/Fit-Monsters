import React, { useState, useContext, useEffect } from "react";
import StatsContext from "./StatsContex";
import Modal from "./Modal";

const JournalEntryInput = ({ showModal, onClose }) => {
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

	const handleOutsideClick = (event) => {
		if (event.target === event.currentTarget) {
			onClose();
		}
	};

	useEffect(() => {
		if (showModal) {
			document.addEventListener("mousedown", handleOutsideClick);
		}

		return () => {
			document.removeEventListener("mousedown", handleOutsideClick);
		};
	}, [showModal, onClose]);

	return (
		<Modal onClose={onClose} show={showModal}>
			<form onSubmit={handleJournalSubmit}>
				<label htmlFor="journalEntry">Write your daily journal:</label>
				<textarea
					id="journalEntry"
					value={journalEntry}
					onChange={handleInputChange}
				/>
				<button type="submit">Submit Journal Entry</button>
			</form>
		</Modal>
	);
};

export default JournalEntryInput;
