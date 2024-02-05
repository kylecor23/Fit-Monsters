import React, { useEffect, useRef } from "react";

function Modal({ onClose, children }) {
	const modalRef = useRef(null);

	const handleOutsideClick = (e) => {
		if (modalRef.current && !modalRef.current.contains(e.target)) {
			onClose();
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleOutsideClick);

		return () => {
			document.removeEventListener("mousedown", handleOutsideClick);
		};
	}, [onClose]);

	return (
		<div className="modal" style={{ zIndex: 9999 }}>
			<div className="modalContainer" ref={modalRef}>
				<div className="modalContent">
					{children}
					{/* <button onClick={onClose}>Close</button> */}
				</div>
			</div>
		</div>
	);
}

export default Modal;
