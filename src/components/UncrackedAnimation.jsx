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
		const [staticTexture, setStaticTexture] = useState(null);
		const [isAnimating, setIsAnimating] = useState(false);
		const animationInterval = useRef(null);
		const jumpAnimationInterval = useRef(null);

		// Clear intervals to prevent memory leaks
		const clearAllIntervals = () => {
			clearInterval(animationInterval.current);
			clearInterval(jumpAnimationInterval.current);
			animationInterval.current = null;
			jumpAnimationInterval.current = null;
		};

		const handleRocking = useCallback(() => {
			if (!textures.length) return;
			setIsAnimating(true);
			clearAllIntervals();
			animationInterval.current = setInterval(() => {
				setCurrentFrame((prevFrame) => {
					const nextFrame = (prevFrame + 1) % textures.length;
					if (nextFrame === 0) {
						setIsAnimating(false);
						clearInterval(animationInterval.current);
						animationInterval.current = null;
					}
					return nextFrame;
				});
			}, 100);
		}, [textures]);

		const handleJump = useCallback(() => {
			if (!jumpTextures.length) return;
			setIsAnimating(true);
			clearAllIntervals();
			jumpAnimationInterval.current = setInterval(() => {
				setCurrentFrame((prevFrame) => {
					const nextFrame = (prevFrame + 1) % jumpTextures.length;
					if (nextFrame === 0) {
						setIsAnimating(false);
						clearInterval(jumpAnimationInterval.current);
						jumpAnimationInterval.current = null;
					}
					return nextFrame;
				});
			}, 100);
			console.log("Jump animation triggered"); // Debugging log
		}, [jumpTextures]);

		useImperativeHandle(ref, () => ({
			triggerJumpAnimation: handleJump,
		}));

		useEffect(() => {
			const loadTextures = async () => {
				const staticImageUrl = "/noCracks.png"; // Update with the correct path
				const staticBaseTexture = PIXI.BaseTexture.from(staticImageUrl);
				setStaticTexture(new PIXI.Texture(staticBaseTexture));

				const responses = await Promise.all([
					fetch("/noCracksWiggleOneShot.json"),
					fetch("/noCracksBounceOneShot.json"),
				]);
				const datas = await Promise.all(
					responses.map((response) => response.json())
				);
				const loader = new PIXI.Loader();
				loader
					.add("wiggle", "/noCracksWiggleOneShot.png") // Update with the correct path
					.add("bounce", "/noCracksBounceOneShot.png") // Update with the correct path
					.load((_, resources) => {
						setTextures(
							buildTextures(datas[0], resources["wiggle"].texture.baseTexture)
						);
						setJumpTextures(
							buildTextures(datas[1], resources["bounce"].texture.baseTexture)
						);
					});
			};
			loadTextures();
			return () => {
				clearAllIntervals();
				PIXI.Loader.shared.reset(); // Uncomment this line
			};
		}, []);

		const buildTextures = (data, baseTexture) => {
			return Object.keys(data.frames).map(
				(key) =>
					new PIXI.Texture(
						baseTexture,
						new PIXI.Rectangle(
							data.frames[key].frame.x,
							data.frames[key].frame.y,
							data.frames[key].frame.w,
							data.frames[key].frame.h
						)
					)
			);
		};

		const texture = isAnimating
			? (jumpAnimationInterval.current ? jumpTextures : textures)[currentFrame]
			: staticTexture || PIXI.Texture.EMPTY;
		const scale = Math.min(
			containerWidth / (texture.width || 1),
			containerHeight / (texture.height || 1),
			1
		);

		console.log(`Displaying frame ${currentFrame} with scale ${scale}`);

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
	}
);

export default AnimatedEggSprite;
