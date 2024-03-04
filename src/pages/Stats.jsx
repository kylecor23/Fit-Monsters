import React, { useContext, useEffect, useState } from "react";
import Chart from "chart.js/auto";
import StatsContext from "../components/StatsContex";
import SideNav from "../components/AsideNav";

function Stats() {
	const { steps } = useContext(StatsContext);
	const [chart, setChart] = useState(null);

	useEffect(() => {
		const canvas = document.getElementById("stepsChart");
		let newChart;

		if (chart) {
			chart.destroy();
		}

		if (canvas) {
			newChart = new Chart(canvas, {
				type: "line",
				data: {
					labels: [],
					datasets: [
						{
							label: "Steps",
							data: [],
							fill: false,
							borderColor: "rgb(75, 192, 192)",
							tension: 0.1,
						},
					],
				},
				options: {
					scales: {
						y: {
							beginAtZero: true,
						},
					},
				},
			});
		}

		setChart(newChart);

		return () => {
			if (newChart) {
				newChart.destroy();
			}
		};
	}, []);

	useEffect(() => {
		if (Array.isArray(steps) && steps.length > 0 && chart) {
			const currentDate = new Date();
			const startOfWeek = new Date(currentDate);
			startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

			chart.data.labels = Array.from({ length: 7 }, (_, i) => {
				const date = new Date(startOfWeek);
				date.setDate(startOfWeek.getDate() + i);
				return date.toLocaleDateString("en-US", { weekday: "long" });
			});

			chart.data.datasets[0].data = steps;
			chart.update();
		}
	}, [steps, chart]);

	useEffect(() => {
		//  update chart with final daily steps
		const updateChartWithFinalSteps = () => {
			if (Array.isArray(steps) && steps.length > 0 && chart) {
				const finalSteps = steps[steps.length - 1];

				chart.data.labels.push(`Day ${chart.data.labels.length + 1}`);
				chart.data.datasets[0].data.push(finalSteps);
				chart.update();
			}
		};

		const now = new Date();
		const endOfDay = new Date(now);
		endOfDay.setHours(23, 59, 59, 999);
		const timeUntilEndOfDay = endOfDay.getTime() - now.getTime();

		// Schedule update to occur at end of day
		const updateTimer = setTimeout(
			updateChartWithFinalSteps,
			timeUntilEndOfDay
		);

		return () => clearTimeout(updateTimer);
	}, [steps, chart]);

	return (
		<div className="container">
			<SideNav />
			<div className="dashboard">
				<canvas id="stepsChart"></canvas>
			</div>
		</div>
	);
}

export default Stats;

// 	return (
// 		<div>
// 			<header>
// 				<h1>Fit Monsters</h1>
// 				<nav className="nav">
// 					<Popup>
// 						<ul>
// 							<li>
// 								<Link to="/dashboard">Dash</Link>
// 							</li>
// 							<li>
// 								<a href="#">History</a>
// 							</li>
// 							<li>
// 								<a href="#">Store</a>
// 							</li>
// 						</ul>
// 					</Popup>
// 				</nav>
// 			</header>
// 			<h1>Stats</h1>
// 			<h2>steps:{steps}</h2>
// 			<StepsInputField activity="steps" />
// 			<h2>calories:{calories}</h2>
// 			<StepsInputField activity="calories" />
// 			<h2>weight:{weight}</h2>
// 			<StepsInputField activity="weight" />
// 			<br />
// 			<div>
// 				<Popup buttonText={"meditaion"}>
// 					<h3>meditate</h3>
// 					<button>stat meditation</button>
// 				</Popup>
// 			</div>
// 		</div>
// 	);
// }
