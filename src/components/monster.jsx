import React, { useState, useEffect, useCallback, useRef } from "react";
import { Stage, Sprite } from "@pixi/react";
import * as PIXI from "pixi.js";

const spriteSheetURL = "/noCracksWiggleOneShot.png";
const jsonURL = "/noCracksWiggleOneShot.json";
const staticEggTexture = "/noCracks.png";

const RockingSprite = ({ x, y, containerWidth, containerHeight }) => {
	const [currentFrame, setCurrentFrame] = useState(0);
	const [textures, setTextures] = useState([
		PIXI.Texture.from(staticEggTexture),
	]);
	const animationInterval = useRef(null);

	const handleRocking = useCallback(() => {
		if (animationInterval.current) return;
		animationInterval.current = setInterval(() => {
			setCurrentFrame((prevFrame) => {
				const nextFrame = prevFrame + 1;
				if (nextFrame >= textures.length) {
					clearInterval(animationInterval.current);
					animationInterval.current = null;
					return 0;
				}
				return nextFrame;
			});
		}, 100);
	}, [textures.length]);

	useEffect(() => {
		const loadTextures = async () => {
			const response = await fetch(jsonURL);
			const data = await response.json();
			const loader = new PIXI.Loader();
			loader.add(spriteSheetURL).load((loader, resources) => {
				const spritesheet = resources[spriteSheetURL].texture.baseTexture;
				const frames = Object.keys(data.frames).map((key) => {
					const { x, y, w, h } = data.frames[key].frame;
					return new PIXI.Texture(spritesheet, new PIXI.Rectangle(x, y, w, h));
				});
				setTextures([PIXI.Texture.from(staticEggTexture), ...frames]);
			});
		};
		loadTextures();
	}, []);

	useEffect(() => {
		console.log(
			"Container Width:",
			containerWidth,
			"Container Height:",
			containerHeight
		);
	}, [containerWidth, containerHeight]);

	// Calculate scale and adjust size
	const texture = textures[currentFrame] || PIXI.Texture.EMPTY;
	const scale = Math.min(
		containerWidth / texture.width,
		containerHeight / texture.height,
		1
	);

	return (
		<Sprite
			texture={texture}
			x={x}
			y={y}
			interactive={true}
			pointerdown={handleRocking}
			anchor={new PIXI.Point(0.5, 0.5)}
			width={texture.width * scale}
			height={texture.height * scale}
		/>
	);
};

const Monster = () => {
	const monsterContainerRef = useRef(null);
	const [containerSize, setContainerSize] = useState({
		width: 640,
		height: 360,
	});

	useEffect(() => {
		const updateSize = () => {
			if (monsterContainerRef.current) {
				setContainerSize({
					width: monsterContainerRef.current.clientWidth,
					height: monsterContainerRef.current.clientHeight,
				});
			}
		};

		window.addEventListener("resize", updateSize);
		updateSize();

		return () => window.removeEventListener("resize", updateSize);
	}, []);

	return (
		<div ref={monsterContainerRef} style={{ width: "100%", height: "100%" }}>
			<Stage
				width={containerSize.width}
				height={containerSize.height}
				options={{ backgroundColor: 0x000000, transparent: true }}
			>
				<RockingSprite
					x={containerSize.width / 2}
					y={containerSize.height / 2}
					containerWidth={containerSize.width}
					containerHeight={containerSize.height}
				/>
			</Stage>
		</div>
	);
};

export default Monster;
