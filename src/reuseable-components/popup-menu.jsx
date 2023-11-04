import React, { useState } from "react";

const Popup = ({ children }) => {
	const [isPopupOpen, setIsPopupOpen] = useState(false);

	const togglePopup = () => {
		setIsPopupOpen(!isPopupOpen);
	};

	return (
		<>
			<button onClick={togglePopup}>Show Popup</button>
			<div
				className={`overlay ${isPopupOpen ? "active" : ""}`}
				onClick={togglePopup}
			>
				<div className="popup">{children}</div>
			</div>
		</>
	);
};

export default Popup;
