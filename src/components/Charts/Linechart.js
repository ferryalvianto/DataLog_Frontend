import React, { useRef } from 'react';
import { Chart, Line } from 'react-chartjs-2';
import { Chart as chartjs } from 'chart.js/auto';
import { resetZoom } from 'chartjs-plugin-zoom';
import { bottomNavigationActionClasses } from '@mui/material';

const Linechart = ({ chartData, hidden, displayLegend, displayTitle, titleText, maintainAspectRatio }) => {
	const options = {
		maintainAspectRatio: maintainAspectRatio,
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
			legend: {
                display: displayLegend,
				// position: 'bottom',
            },
			title: {
                display: displayTitle,
                text: titleText,
				position:'bottom'
            }
		},
	};

	const chartRef = useRef();
	const handleReset = () => {
		chartRef.current.resetZoom();
	};

	return (
		<>
			<Line ref={chartRef} data={chartData} options={options} />
			<button className={`btn`} onClick={handleReset} hidden={hidden}>Reset Zoom</button>
		</>
	);
};

export default Linechart;
