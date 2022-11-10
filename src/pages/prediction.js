import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/navbar';
import { Chart } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import { TemperatureData } from '../TempData/RegressionData1';
import { InflationData } from '../TempData/RegressionData2';
import { AllFactorsData } from '../TempData/RegressionData3';
import Linechart from '../components/Charts/Linechart';

export default function Prediction() {
	const API_URL = 'http://localhost:8000/api/';
	const [weatherForecast, setWeatherForecast] = useState({
		labels: '',
		datasets: [],
	});

	useEffect(() => {
		axios.get(API_URL + 'forecasted_weather').then((res) => {
			setWeatherForecast({
				...weatherForecast,
				labels: res.data.map((element) => element.dt_txt),
				datasets: [
					{
						data: res.data.map((element) => element.temp),
						backgroundColor: '#FA8072',
						borderColor: '#800000',
						tension: 0.4,
					},
				],
			});
		});
	}, []);
	const [regression, setRegression] = useState({
		labels: TemperatureData.map((data) => data.date),
		datasets: [
			{
				label: 'Regression based on past sales in CAD',
				data: [5500, 4100, 4900, 6200, 6900, 6100, 6480],
				backgroundColor: 'rgba(75,192,192,1)',
				borderColor: 'rgba(75,192,192,1)',
			},
			{
				label: 'Regression based on temperature in CAD',
				data: TemperatureData.map((data) => data.data),
				backgroundColor: '#50AF95',
				borderColor: '#50AF95',
			},
			{
				label: 'Regression based on inflation in CAD',
				data: InflationData.map((data) => data.data),
				backgroundColor: '#f3ba2f',
				borderColor: '#f3ba2f',
			},
			{
				label: 'Regression based on all factors in CAD',
				data: AllFactorsData.map((data) => data.data),
				backgroundColor: '#2a71d0',
				borderColor: '#2a71d0',
			},
		],
	});
	Chart.register(zoomPlugin);
	return (
		<>
			<Navbar />
			<div
				style={{ width: 700, paddingLeft: '103px' }}
				className={`align-items-center dashboardTemplate`}
			>
				<Linechart chartData={regression} hidden={false} />
			</div>
			<div style={{ width: 700, paddingLeft: '103px' }}>
				<Linechart
					chartData={weatherForecast}
					hidden={true}
					displayLegend={false}
					displayTitle={true}
					titleText="Temperature Forecast"
				/>
			</div>
		</>
	);
}
