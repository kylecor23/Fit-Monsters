import React, { useEffect } from "react";

function Modal({ onClose, children }) {
	useEffect(() => {
		const handleOutsideClick = (e) => {
			if (!e.target.closest(".modalContent")) {
				onClose();
			}
		};

		document.addEventListener("mousedown", handleOutsideClick);

		return () => {
			document.removeEventListener("mousedown", handleOutsideClick);
		};
	}, [onClose]);

	return (
		<div className="modal" style={{ zIndex: 9999 }}>
			<div className="modalContainer">
				<div className="modalContent">
					{children}
					{/* <button onClick={onClose}>Close</button> */}
				</div>
			</div>
		</div>
	);
}

export default Modal;
