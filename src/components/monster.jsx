import React, { useState, useEffect } from "react";
import { Stage, Sprite } from "@pixi/react";
import * as PIXI from "pixi.js";
import eggImage from "/green_dragon_egg64.png";

const RockingSprite = ({ image, x, y, canvasWidth }) => {
	const [rotation, setRotation] = useState(0);
	const [direction, setDirection] = useState(1);
	const [isRocking, setIsRocking] = useState(false);

	// Adjust the scale of the egg based on the canvas width to keep its visual size consistent
	const scale = Math.max(canvasWidth / 800, 0.5);

	useEffect(() => {
		let intervalId;

		if (isRocking) {
			intervalId = setInterval(() => {
				setRotation((prevRotation) => {
					let newRotation = prevRotation + 0.01 * direction;
					if (newRotation > 0.2 || newRotation < -0.2) {
						setDirection(-direction);
					}
					return newRotation;
				});
			}, 16);
			// Stop rocking after 3 seconds
			setTimeout(() => {
				setIsRocking(false);
				setRotation(0);
			}, 3000);
		}

		return () => clearInterval(intervalId);
	}, [isRocking, direction]);

	// Start rocking randomly every 1 to 5 minutes
	useEffect(() => {
		const startRockingRandomly = () => {
			const minDelay = 60000;
			const maxDelay = 300000;
			const delay = Math.random() * (maxDelay - minDelay) + minDelay;

			setTimeout(() => {
				setIsRocking(true);
				startRockingRandomly();
			}, delay);
		};

		startRockingRandomly();

		return () => clearTimeout(startRockingRandomly);
	}, []);

	return (
		<Sprite
			image={image}
			anchor={0.5}
			x={x}
			y={y}
			rotation={rotation}
			scale={{ x: scale, y: scale }}
			interactive={true}
			pointerdown={() => setIsRocking(!isRocking)}
		/>
	);
};

const Monster = () => {
	const [dimensions, setDimensions] = useState({ width: 640, height: 480 });

	useEffect(() => {
		const adjustSize = () => {
			// Adjust the canvas size based on the container size while maintaining aspect ratio
			const width = Math.min(window.innerWidth, 640);
			const height = (width * 3) / 4;
			setDimensions({ width, height });
		};

		window.addEventListener("resize", adjustSize);
		adjustSize();
		return () => window.removeEventListener("resize", adjustSize);
	}, []);

	return (
		<div
			style={{
				maxWidth: "100vw",
				maxHeight: "100vh",
				overflow: "hidden",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Stage
				width={dimensions.width}
				height={dimensions.height}
				options={{
					backgroundAlpha: 0,
					autoDensity: true,
					resolution: window.devicePixelRatio || 1,
				}}
			>
				<RockingSprite
					image={eggImage}
					x={dimensions.width / 2}
					y={dimensions.height / 2}
					canvasWidth={dimensions.width}
				/>
			</Stage>
		</div>
	);
};

export default Monster;
