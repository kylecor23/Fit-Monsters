import React, { useContext, useEffect, useState, useRef } from "react";
import Chart from "chart.js/auto";
import StatsContext from "../components/StatsContex";
import SideNav from "../components/AsideNav";

function Stats() {
	const { steps, weight, calories } = useContext(StatsContext);
	const chartRef = useRef(null);
	const [chart, setChart] = useState(null);

	useEffect(() => {
		const canvas = chartRef.current;
		let newChart;

		if (chart) {
			chart.destroy();
		}

		if (canvas) {
			newChart = new Chart(canvas, {
				type: "line",
				data: {
					labels: ["Start", "Current"],
					datasets: [
						{
							label: "Steps",
							data: [0, steps],
							fill: false,
							borderColor: "rgb(75, 192, 192)",
							tension: 0.1,
						},
						{
							label: "Weight",
							data: [0, weight],
							fill: false,
							borderColor: "rgb(192, 75, 192)",
							tension: 0.1,
						},
						{
							label: "Calories",
							data: [0, calories],
							fill: false,
							borderColor: "rgb(192, 192, 75)",
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
	}, [steps, weight, calories]);

	return (
		<div className="container">
			<SideNav />
			<div className="dashboard">
				<h2>Step Count: {steps}</h2>
				<h2>Weight: {weight}</h2>
				<h2>Calories: {calories}</h2>
				<canvas id="stepsChart" ref={chartRef}></canvas>
			</div>
		</div>
	);
}

export default Stats;
