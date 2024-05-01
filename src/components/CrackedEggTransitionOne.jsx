import React, { useEffect, useState } from "react";
import { Stage, Sprite } from "@pixi/react";
import { Loader, Spritesheet } from "pixi.js";

const CrackedEggTransitionOne = ({ onComplete }) => {
	const [animationLoaded, setAnimationLoaded] = useState(false);
	const [sheet, setSheet] = useState(null);

	useEffect(() => {
		const loader = new Loader();

		// Load both the image and the JSON data for the spritesheet
		loader.add("stageOneCracks", "/stageOneCracks.png");
		loader.add("stageOneCracksData", "/stageOneCracks.json");

		loader.load((loader, resources) => {
			// Check if both resources are loaded successfully
			if (
				resources.stageOneCracks &&
				resources.stageOneCracksData &&
				resources.stageOneCracks.data
			) {
				const texture = resources.stageOneCracks.texture;
				const data = resources.stageOneCracksData.data;

				// Create a new Spritesheet instance
				const spritesheet = new Spritesheet(texture.baseTexture, data);

				// Parse the spritesheet
				spritesheet.parse(() => {
					setSheet(spritesheet);
					setAnimationLoaded(true);
				});
			}
		});

		// Clean up resources
		return () => {
			loader.destroy();
		};
	}, []);

	return (
		<div>
			{animationLoaded && sheet ? (
				<Stage>
					<Sprite
						texture={sheet.textures["stageOneCracks.png"]}
						anchor={0.5}
						animationSpeed={0.2}
						loop={false}
						onComplete={onComplete}
						play
					/>
				</Stage>
			) : null}
		</div>
	);
};

export default CrackedEggTransitionOne;
