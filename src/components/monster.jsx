import React, {
	useContext,
	useRef,
	useState,
	useEffect,
	forwardRef,
} from "react";
import { Stage } from "@pixi/react";
import StatsContext from "./StatsContex";
import AnimatedEggSprite from "./UncrackedAnimation";
import AnimatedCrackedEggSprite from "./CrackedEggAnimation";
import TransitionAnimationOne from "./CrackedEggTransitionOne";

const Monster = forwardRef(({ triggerJumpAnimation }, ref) => {
	const { steps } = useContext(StatsContext);
	const containerRef = useRef(null);
	const [containerSize, setContainerSize] = useState({
		width: 640,
		height: 360,
	});
	const [transitionPlayed, setTransitionPlayed] = useState(false);

	useEffect(() => {
		function updateSize() {
			if (containerRef.current) {
				setContainerSize({
					width: containerRef.current.clientWidth,
					height: containerRef.current.clientHeight,
				});
			}
		}
		window.addEventListener("resize", updateSize);
		updateSize();
		return () => window.removeEventListener("resize", updateSize);
	}, []);

	let ActiveSprite =
		!transitionPlayed && steps >= 20000
			? TransitionAnimationOne
			: AnimatedEggSprite;

	useEffect(() => {
		if (steps >= 20000 && !transitionPlayed) {
			setTransitionPlayed(true);
		}
	}, [steps, transitionPlayed]);

	return (
		<div ref={containerRef} style={{ width: "100%", height: "100%" }}>
			<Stage
				width={containerSize.width}
				height={containerSize.height}
				options={{ backgroundColor: 0x000000, backgroundAlpha: 0 }}
			>
				<ActiveSprite
					x={containerSize.width / 2}
					y={containerSize.height / 2}
					containerWidth={containerSize.width}
					containerHeight={containerSize.height}
					triggerJumpAnimation={triggerJumpAnimation}
				/>
			</Stage>
		</div>
	);
});

export default Monster;
