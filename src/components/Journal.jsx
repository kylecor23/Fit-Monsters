import React, { useState, useContext, useEffect } from "react";
import StatsContext from "./StatsContex";
import Modal from "./Modal";

const JournalEntryInput = ({ onClose }) => {
	const [journalEntry, setJournalEntry] = useState("");
	const [viewLastEntry, setViewLastEntry] = useState(false);
	const [lastEntry, setLastEntry] = useState("");
	const { updateStats } = useContext(StatsContext);

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
		onClose();
	};

	const handleOverlayClick = (event) => {
		if (event.target.classList.contains("modal-overlay")) {
			onClose();
		}
	};

	const openLastEntryModal = () => {
		setViewLastEntry(true);
	};

	const closeLastEntryModal = () => {
		setViewLastEntry(false);
	};

	return (
		<>
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
					<button className="modalButton" onClick={openLastEntryModal}>
						View Last Journal Entry
					</button>
					<button className="modalButton" onClick={onClose}>
						Close
					</button>
				</div>
			</Modal>
			{viewLastEntry && (
				<Modal show={viewLastEntry} onClose={closeLastEntryModal}>
					<div className="lastJournalEntry">
						<h2>Last Journal Entry</h2>
						<p>{lastEntry || "No last journal entry found."}</p>
						<button className="modalButton" onClick={closeLastEntryModal}>
							Close
						</button>
					</div>
				</Modal>
			)}
		</>
	);
};

export default JournalEntryInput;
