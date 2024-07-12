import React, { useState } from "react";

function ImageCarousel({ images, nextSlide }) {
	const currentImageIndex = nextSlide ? 1 : 0;

	const currentImage = images[currentImageIndex];

	return (
		<div className="imageCarousel">
			<img className="imageProperty" src={currentImage} alt="Image" />
		</div>
	);
}

function SlideShow() {
	const [nextSlide, setNextSlide] = useState(false);

	const toggleSlide = () => {
		setNextSlide(!nextSlide);
	};

	const images = [
		"https://media.istockphoto.com/id/1331628411/vector/cute-monster-do-weight-lifting-cartoon-icon-illustration.jpg?s=612x612&w=0&k=20&c=GuqtCE2CnbDRYRc4ozs043pJ_VbPy20_8h2KKtDr0tQ=",
		"https://media.istockphoto.com/id/1486708389/vector/cute-ghost-mascot-illustration-doing-weightlifting-illustration-of-a-ghost-doing-sports.jpg?s=612x612&w=0&k=20&c=e1aWV1pywLvXYqJcgiBz8zw1YciDGEvZ8cLHoE6uUR0=",
	];

	return (
		<div>
			<ImageCarousel images={images} nextSlide={nextSlide} />

			<button onClick={toggleSlide}>Toggle Slide</button>
		</div>
	);
}

export default SlideShow;
