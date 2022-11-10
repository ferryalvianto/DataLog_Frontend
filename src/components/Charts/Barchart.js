import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as chartjs } from 'chart.js/auto';

const Barchart = ({ chartData, displayLegend, displayTitle, titleText }) => {
	const [cursor, setCursor] = useState('default');
	const changeCursor = () => {
		setCursor((prevState) => {
			return 'pointer';
		});
	};

	const  options= {
        plugins: {
            legend: {
                display: displayLegend,
            },
			title: {
                display: displayTitle,
                text: titleText,
				position:'bottom'
            }
        }
    }
	return (
		<Bar
			data={chartData}
			onMouseEnter={changeCursor}
			options={options}
			style={{ cursor: cursor }}
		/>
	);
};

export default Barchart;
