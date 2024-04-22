import React, {
	useState,
	useEffect,
	useCallback,
	useRef,
	forwardRef,
	useImperativeHandle,
} from "react";
import { Sprite } from "@pixi/react";
import * as PIXI from "pixi.js";

const AnimatedEggSprite = forwardRef(
	({ x, y, containerWidth, containerHeight }, ref) => {
		const [currentFrame, setCurrentFrame] = useState(0);
		const [textures, setTextures] = useState([]);
		const [jumpTextures, setJumpTextures] = useState([]);
		const animationInterval = useRef(null);
		const jumpAnimationInterval = useRef(null);

		const handleRocking = useCallback(() => {
			if (animationInterval.current) return; // Prevent multiple wiggle intervals
			console.log("Rocking animation started");
			animationInterval.current = setInterval(() => {
				setCurrentFrame((prevFrame) => {
					const nextFrame = prevFrame + 1;
					if (nextFrame >= textures.length) {
						clearInterval(animationInterval.current);
						animationInterval.current = null;
						console.log("Rocking animation stopped");
						return 0; // Reset to first frame
					}
					return nextFrame;
				});
			}, 100);
		}, [textures]);

		const handleJump = useCallback(() => {
			clearInterval(animationInterval.current); // Stop any existing wiggle animation
			animationInterval.current = null;
			setCurrentFrame(0); // Reset to first frame for jump
			if (jumpAnimationInterval.current) return; // Prevent multiple jump intervals
			console.log("Jumping animation started");
			jumpAnimationInterval.current = setInterval(() => {
				setCurrentFrame((prevFrame) => {
					const nextFrame = prevFrame + 1;
					if (nextFrame >= jumpTextures.length) {
						clearInterval(jumpAnimationInterval.current);
						jumpAnimationInterval.current = null;
						console.log("Jumping animation stopped");
						return 0; // Reset to first frame
					}
					return nextFrame;
				});
			}, 100);
		}, [jumpTextures]);

		useImperativeHandle(ref, () => ({
			triggerJumpAnimation: handleJump,
		}));

		useEffect(() => {
			const loadTextures = async () => {
				const responses = await Promise.all([
					fetch("/noCracksWiggleOneShot.json"),
					fetch("/noCracksBounceOneShot.json"),
				]);
				const datas = await Promise.all(
					responses.map((response) => response.json())
				);
				const loader = new PIXI.Loader();
				loader
					.add("/noCracksWiggleOneShot.png")
					.add("/noCracksBounceOneShot.png")
					.load((_, resources) => {
						const rockingFrames = Object.keys(datas[0].frames).map(
							(key) =>
								new PIXI.Texture(
									resources["/noCracksWiggleOneShot.png"].texture.baseTexture,
									new PIXI.Rectangle(
										datas[0].frames[key].frame.x,
										datas[0].frames[key].frame.y,
										datas[0].frames[key].frame.w,
										datas[0].frames[key].frame.h
									)
								)
						);
						const jumpFrames = Object.keys(datas[1].frames).map(
							(key) =>
								new PIXI.Texture(
									resources["/noCracksBounceOneShot.png"].texture.baseTexture,
									new PIXI.Rectangle(
										datas[1].frames[key].frame.x,
										datas[1].frames[key].frame.y,
										datas[1].frames[key].frame.w,
										datas[1].frames[key].frame.h
									)
								)
						);
						setTextures(rockingFrames);
						setJumpTextures(jumpFrames);
					});
			};
			loadTextures();

			return () => {
				if (animationInterval.current) clearInterval(animationInterval.current);
				if (jumpAnimationInterval.current)
					clearInterval(jumpAnimationInterval.current);
			};
		}, []);

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
				pointerdown={handleRocking} // Only trigger wiggle on click
				anchor={new PIXI.Point(0.5, 0.5)}
				width={texture.width * scale}
				height={texture.height * scale}
			/>
		);
	}
);

export default AnimatedEggSprite;
