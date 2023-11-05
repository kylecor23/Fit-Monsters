import React, { useState } from "react";

function ImageCarousel({ images }) {
	const [nextSlide, setNextSlide] = useState(false);

	const toggleSlide = () => {
		setNextSlide(!nextSlide);
	};

	const currentImageIndex = nextSlide ? 1 : 0;

	const currentImage = images[currentImageIndex];

	return (
		<div className="imageCarousel">
			<img src={currentImage} alt="Image" />
		</div>
	);
}

function SlideShow() {
	const images = [
		// Add image URLs here
	];

	return (
		<div>
			<ImageCarousel images={images} />
			{/* add funtion onclick to button */}
			<button>Toggle Slide</button>
		</div>
	);
}

export default SlideShow;
