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

const AnimatedCrackedEggSprite = forwardRef(
	({ x, y, containerWidth, containerHeight }, ref) => {
		const [currentFrame, setCurrentFrame] = useState(0);
		const [textures, setTextures] = useState([]);
		const [jumpTextures, setJumpTextures] = useState([]);
		const [staticTexture, setStaticTexture] = useState(null);
		const [isAnimating, setIsAnimating] = useState(false);
		const animationInterval = useRef(null);
		const jumpAnimationInterval = useRef(null);

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
		}, [jumpTextures]);

		useImperativeHandle(ref, () => ({
			triggerJumpAnimation: handleJump,
		}));

		useEffect(() => {
			const loadTextures = async () => {
				const staticImageUrl = "/public/stageOneCracksStatic.PNG";
				const staticBaseTexture = PIXI.BaseTexture.from(staticImageUrl);
				setStaticTexture(new PIXI.Texture(staticBaseTexture));

				const responses = await Promise.all([
					fetch("/public/stageOneCracksWiggleOneShot.json"),
					fetch("/public/stageOneCracksBounceOneShot.json"),
				]);
				const datas = await Promise.all(
					responses.map((response) => response.json())
				);
				const loader = new PIXI.Loader();
				loader
					.add("wiggle", "/public/stageOneCracksWiggleOneShot.png")
					.add("bounce", "/public/stageOneCracksBounceOneShot.png")
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
				PIXI.Loader.shared.reset();
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

export default AnimatedCrackedEggSprite;
