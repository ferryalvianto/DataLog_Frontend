import React, { useState, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as chartjs } from 'chart.js/auto';
import { resetZoom } from 'chartjs-plugin-zoom';

const BarchartZoom = ({ chartData , hidden}) => {
	const options = {
		scales: {
			x: {
				grid: {
					display: false,
				},
			},

			y: {
				grid: {
					display: false,
				},
			},
		},
		animations: {
			radius: {
				duration: 400,
				easing: 'linear',
				loop: (context) => context.active,
			},
		},
		hoverRadius: 12,
		hoverBackgroundColor: 'yellow',
		plugins: {
			zoom: {
				pan: {
					enabled: true,
					mode: 'xy',
					threshold: 5,
				},
				zoom: {
					wheel: {
						enabled: true,
					},
					pinch: {
						enabled: true,
					},
					mode: 'xy',
				},
			},
		},
	};

	const chartRef = useRef();
	const handleReset = () => {
		chartRef.current.resetZoom();
	};

	return (
		<>
			<Bar
				ref={chartRef}
				data={chartData}
				options={options}
			/>
			<button className={`btn`} onClick={handleReset} hidden={hidden}>
				Reset Zoom
			</button>
		</>
	);
};

export default BarchartZoom;
