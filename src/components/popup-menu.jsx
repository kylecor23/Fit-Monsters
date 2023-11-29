import React, { useState } from "react";

const Popup = ({ buttonText, children }) => {
	const [isPopupOpen, setIsPopupOpen] = useState(false);

	const togglePopup = () => {
		setIsPopupOpen(!isPopupOpen);
	};

	return (
		<>
			<button onClick={togglePopup}>{buttonText}</button>
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
