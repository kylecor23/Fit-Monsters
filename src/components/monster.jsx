import React, { useState, useEffect, useCallback } from "react";
import { Stage, Sprite } from "@pixi/react";
import * as PIXI from "pixi.js";

const RockingSprite = ({ image, x, y }) => {
	const [rotation, setRotation] = useState(0);
	const [direction, setDirection] = useState(1);
	const [isRocking, setIsRocking] = useState(false);

	const startRocking = useCallback(() => {
		setIsRocking(true);
		console.log("Egg started rocking.");
	}, []);

	const stopRocking = useCallback(() => {
		setIsRocking(false);
		setRotation(0); // Reset rotation to 0 to return to the normal position
		console.log("Egg stopped rocking.");
	}, []);

	// Handle user click to start rocking
	const handleRocking = useCallback(() => {
		startRocking();
		setTimeout(() => {
			stopRocking();
		}, 5000); // Rock for 5 seconds then stop
	}, [startRocking, stopRocking]);

	// Rocking effect
	useEffect(() => {
		if (!isRocking) return;

		const ticker = new PIXI.Ticker();
		ticker.add(() => {
			setRotation((prevRotation) => {
				let newRotation = prevRotation + 0.01 * direction;
				if (newRotation > 0.2 || newRotation < -0.2) {
					setDirection(-direction);
				}
				return newRotation;
			});
		});
		ticker.start();

		return () => {
			ticker.stop();
			ticker.destroy();
		};
	}, [direction, isRocking]);

	// Randomly initiate rocking
	useEffect(() => {
		const minDelay = 2 * 60 * 1000;
		const maxDelay = 5 * 60 * 1000;
		const randomDelay = Math.random() * (maxDelay - minDelay) + minDelay;

		const timeoutId = setTimeout(() => {
			startRocking();
			setTimeout(stopRocking, 5000);
		}, randomDelay);

		return () => clearTimeout(timeoutId);
	}, [startRocking, stopRocking]);

	return (
		<Sprite
			image={image}
			anchor={0.5}
			x={x}
			y={y}
			rotation={rotation}
			interactive={true}
			pointerdown={handleRocking}
		/>
	);
};

const Monster = () => {
	return (
		<Stage
			width={640}
			height={360}
			options={{
				transparent: true,
				backgroundColor: 0x000000,
				clearBeforeRender: true,
			}}
		>
			<RockingSprite image="/green_dragon_egg64.png" x={320} y={180} />
		</Stage>
	);
};

export default Monster;
