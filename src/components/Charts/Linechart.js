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
				position: 'bottom'
			}
		},
	};

	const chartRef = useRef();
	const handleReset = () => {
		chartRef.current.resetZoom();
	};

	return (
		<>
			<div style={{ height: '100%', width: '70%', display: 'inline-block' }} >
				<Line ref={chartRef} data={chartData} options={options} />

				<div style={{width:'40%', display: 'inline-block', padding:'2rem' }}>
					<button className={`btn bttn`} onClick={handleReset} hidden={hidden}>
						Reset Zoom
					</button>
				</div>

			</div>
		</>
	);
};

export default Linechart;
