import React, { useState, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as chartjs } from 'chart.js/auto';

const BarchartFilterDate = ({ initialDate, initialDataPoint, label }) => {
	const [cursor, setCursor] = useState('default');
	const changeCursor = () => {
		setCursor((prevState) => {
			//console.log('mouse is pointer');
			return 'pointer';
		});
	};

	const inputRef1 = useRef();
	const inputRef2 = useRef();

	const [chartData, setChartData] = useState({
		labels: initialDate,
		datasets: [
			{
				label: label,
				data: initialDataPoint,
				backgroundColor: 'rgba(75,192,192,1)',
				borderColor: 'black',
				borderWidth: 1,
			},
		],
	});

	const filterData = () => {
		const dates2 = [...initialDate];
		const dataPoints2 = [...initialDataPoint];

		//get the index number in array
		let value1 = inputRef1.current.value;
		let value2 = inputRef2.current.value;
		const indexStartDate = dates2.indexOf(value1);
		const indexEndDate = dates2.indexOf(value2);

		//slice array to show the selected range date
		const filterDate = dates2.slice(indexStartDate, indexEndDate + 1);
		const filterDataPoints = dataPoints2.slice(
			indexStartDate,
			indexEndDate + 1
		);

		//replace labels of userData1
		setChartData({
			...chartData,
			labels: filterDate,
			datasets: [
				{
					label: label,
					data: filterDataPoints,
					backgroundColor: 'rgba(75,192,192,1)',
					borderColor: 'black',
					borderWidth: 1,
				},
			],
		});
	};

	const resetData = () => {
		setChartData({
			labels: initialDate,
			datasets: [
				{
					label: label,
					data: initialDataPoint,
					backgroundColor: 'rgba(75,192,192,1)',
					borderColor: 'black',
					borderWidth: 1,
				},
			],
		});
	};

	return (
		<>
			<Bar
				data={chartData}
				onMouseEnter={changeCursor}
				style={{ cursor: cursor }}
			/>
			<input type="date" ref={inputRef1} />
			<input type="date" ref={inputRef2} />
			<button onClick={filterData}>Filter</button>
			<button onClick={resetData}>Reset</button>
		</>
	);
};

export default BarchartFilterDate;
