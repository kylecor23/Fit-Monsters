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

	// Extend children with a ref only if they need it
	const enhancedChildren = React.Children.map(children, (child) => {
		if (React.isValidElement(child) && child.props.needsRef) {
			return React.cloneElement(child, { containerRef: modalRef });
		}
		return child;
	});

	return (
		<div className="modal" style={{ zIndex: 9999 }}>
			<div className="modalContainer" ref={modalRef}>
				<div className="modalContent">{enhancedChildren}</div>
			</div>
		</div>
	);
}

export default Modal;
