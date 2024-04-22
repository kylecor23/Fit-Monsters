import React, {
	useRef,
	useState,
	useEffect,
	forwardRef,
	useImperativeHandle,
} from "react";
import { Stage } from "@pixi/react";
import AnimatedEggSprite from "./monsterAnimation";

const Monster = forwardRef((props, ref) => {
	const monsterContainerRef = useRef(null);
	const [containerSize, setContainerSize] = useState({
		width: 640,
		height: 360,
	});
	const animatedEggRef = useRef(); // Internal ref for the animated sprite

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

	// Exposing the handleJump function to the parent component using useImperativeHandle
	useImperativeHandle(ref, () => ({
		handleJump: () => {
			if (animatedEggRef.current) {
				animatedEggRef.current.triggerJumpAnimation(); // Call the function from the child component
			}
		},
	}));

	return (
		<div ref={monsterContainerRef} style={{ width: "100%", height: "100%" }}>
			<Stage
				width={containerSize.width}
				height={containerSize.height}
				options={{ backgroundColor: 0x000000, backgroundAlpha: 0 }}
			>
				<AnimatedEggSprite
					ref={animatedEggRef}
					x={containerSize.width / 2}
					y={containerSize.height / 2}
					containerWidth={containerSize.width}
					containerHeight={containerSize.height}
				/>
			</Stage>
		</div>
	);
});

export default Monster;
