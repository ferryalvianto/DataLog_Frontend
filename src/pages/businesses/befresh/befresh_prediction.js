import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../../components/navbar';
import { Chart } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import { TemperatureData } from '../../../TempData/RegressionData1';
import { InflationData } from '../../../TempData/RegressionData2';
import { AllFactorsData } from '../../../TempData/RegressionData3';
import Linechart from '../../../components/Charts/Linechart';
import { useNavigate, useParams } from 'react-router-dom';
import ExportExcel from '../../../components/excelExport';

export default function BeFreshPrediction() {
	const params = useParams();
	let user = [];

	const API_URL = 'https://datalogwebapp.herokuapp.com/datalog/api/';
	// const API_URL = 'http://127.0.0.1:8000/datalog/api/';

	const [excelExportData, setExportData] = useState([]);

	const [revenueForecast, setRevenueForecast] = useState({
		labels: '',
		datasets: [],
	});

	const [inflation, setInflation] = useState({
		labels: '',
		datasets: [],
	});

	const [weatherForecast, setWeatherForecast] = useState({
		labels: '',
		datasets: [],
	});

	const [quantityForecast, setQuantityForecast] = useState({
		labels: '',
		datasets: [],
	});

	const get_revenue_forecast_api = () => {
		axios
			.get(API_URL + 'revenue_forecast', {
				params: {
					db: user.db,
				},
			})
			.then((res) => {
				// console.log(res.data);
				setRevenueForecast({
					...revenueForecast,
					labels: res.data.map((element) => element.date),
					datasets: [
						{
							label: 'Revenue Forecast based on Past Sales',
							data: res.data.map((element) => element.CY_predictedRevenue),
							backgroundColor: 'rgba(54, 162, 235,0.8)',
							borderColor: 'black',
							borderWidth: 1,
						},
					],
				});
			})
			.catch((e) => {
				console.log(e);
			});
	};

	const get_inflation_api = () => {
		axios
			.get(API_URL + 'inflation', {
				params: {
					db: user.db,
				},
			})
			.then((res) => {
				// console.log(res.data);
				setInflation({
					...inflation,
					labels: res.data.map((element) => element.date),
					datasets: [
						{
							label: 'Revenue Forecast based on Inflation',
							data: res.data.map((element) => element.CY_predictedRevenue_Inflation),
							backgroundColor: 'rgba(54, 162, 235,0.8)',
							borderColor: 'black',
							borderWidth: 1,
						},
					],
				});
			})
			.catch((e) => {
				console.log(e);
			});
	};

	const get_weather_forecast_api = () => {
		axios.get(API_URL + 'forecasted_weather').then((res) => {
			setWeatherForecast({
				...weatherForecast,
				labels: res.data.map((element) => element.dt_txt),
				datasets: [
					{
						data: res.data.map((element) => element.temp_avg),
						backgroundColor: '#FA8072',
						borderColor: '#800000',
						tension: 0.4,
					},
				],
			});
		});
	};

	const get_excel_export_api = () => {
		axios.get(API_URL + 'quantity_forecast_table', {
			params: {
				db: user.db,
			},
		}).then((res) => {
			setExportData(res.data);
		});
	};

	const get_quantity_forecast_api = () => {
		axios
			.get(API_URL + 'quantity_forecast', {
				params: {
					db: user.db,
				},
			})
			.then((res) => {
				// console.log(res.data);
				// setExportData(res.data);
				setQuantityForecast({
					...quantityForecast,
					labels: res.data
						.filter((item) => item.Category === 'Bakery')
						.map((element) => element.Date),
					datasets: [
						{
							label: 'Bakery',
							data: res.data
								.filter((item) => item.Category === 'Bakery')
								.map((element) => element.predicted_quantity.toFixed()),
							backgroundColor: '#DAA520',
							borderColor: '#FFD700',
						},
						{
							label: 'Be Fresh Meals',
							data: res.data
								.filter((item) => item.Category === 'Be Fresh Meals')
								.map((element) => element.predicted_quantity.toFixed()),
							backgroundColor: '#006400',
							borderColor: '#556B2F',
						},
						{
							label: 'Be Fresh Products',
							data: res.data
								.filter((item) => item.Category === 'Be Fresh Products')
								.map((element) => element.predicted_quantity.toFixed()),
							backgroundColor: '#FF00FF',
							borderColor: '#FFB6C1',
						},
						{
							label: 'Beverages',
							data: res.data
								.filter((item) => item.Category === 'Beverages')
								.map((element) => element.predicted_quantity.toFixed()),
							backgroundColor: '#0000CD',
							borderColor: '#87CEFA',
						},
						{
							label: 'Coffee Bar',
							data: res.data
								.filter((item) => item.Category === 'Coffee Bar')
								.map((element) => element.predicted_quantity.toFixed()),
							backgroundColor: '#663300',
							borderColor: '#996633',
						},
						{
							label: 'Dairy',
							data: res.data
								.filter((item) => item.Category === 'Dairy')
								.map((element) => element.predicted_quantity.toFixed()),
							backgroundColor: '#003300',
							borderColor: '#33CC33',
						},
						{
							label: 'Deli',
							data: res.data
								.filter((item) => item.Category === 'Deli')
								.map((element) => element.predicted_quantity.toFixed()),
							backgroundColor: '#8B0000',
							borderColor: '#DC143C',
						},
						{
							label: 'Grocery',
							data: res.data
								.filter((item) => item.Category === 'Grocery')
								.map((element) => element.predicted_quantity.toFixed(2)),
							backgroundColor: '#8B0000',
							borderColor: '#FF0000',
						},
						{
							label: 'Health & Beauty',
							data: res.data
								.filter((item) => item.Category === 'Health & Beauty')
								.map((element) => element.predicted_quantity.toFixed()),
							backgroundColor: '#2F4F4F',
							borderColor: '#696969',
						},
						{
							label: 'Health & Home',
							data: res.data
								.filter((item) => item.Category === 'Health & Home')
								.map((element) => element.predicted_quantity.toFixed()),
							backgroundColor: '#7CFC00',
							borderColor: '#ADFF2F',
						},
						{
							label: 'Heat & Eat',
							data: res.data
								.filter((item) => item.Category === 'Heat & Eat')
								.map((element) => element.predicted_quantity.toFixed()),
							backgroundColor: '#FF4500',
							borderColor: '#FFA07A',
						},
						{
							label: 'Meat & Seafood',
							data: res.data
								.filter((item) => item.Category === 'Meat & Seafood')
								.map((element) => element.predicted_quantity.toFixed(2)),
							backgroundColor: '#EEE8AA',
							borderColor: '#F4A460',
						},
						{
							label: 'Produce',
							data: res.data
								.filter((item) => item.Category === 'Produce')
								.map((element) => element.predicted_quantity.toFixed(2)),
							backgroundColor: '#008080',
							borderColor: '#40E0D0',
						},
						{
							label: 'Snacks',
							data: res.data
								.filter((item) => item.Category === 'Snacks')
								.map((element) => element.predicted_quantity.toFixed()),
							backgroundColor: '#DAA520',
							borderColor: '#FFFF00',
						},
					],
				});
			})
			.catch((e) => {
				console.log(e);
			});
	};

	useEffect(() => {
		if ('user' in localStorage) {
			user = JSON.parse(localStorage.getItem('user'));
			if (params.businessname != user.db.toLowerCase()) {
				sessionStorage.setItem('url', params.businessname);
				navigate('/badpage');
				window.location.reload();
			} else {
				if (
					'user' in localStorage &&
					params.businessname == user.db.toLowerCase()
				) {
					sessionStorage.clear();
					get_excel_export_api();
					get_inflation_api();
					get_revenue_forecast_api();
					get_quantity_forecast_api();
					get_weather_forecast_api();
				}
			}
		} else {
			navigate('/home');
			window.location.reload();
		}
	}, []);

	// const [regression, setRegression] = useState({
	// 	labels: TemperatureData.map((data) => data.date),
	// 	datasets: [
	// 		{
	// 			label: 'Regression based on past sales in CAD',
	// 			data: [5500, 4100, 4900, 6200, 6900, 6100, 6480],
	// 			backgroundColor: 'rgba(75,192,192,1)',
	// 			borderColor: 'rgba(75,192,192,1)',
	// 		},
	// 	],
	// });
	Chart.register(zoomPlugin);
	return (
		<>
			<Navbar />
			<div
				style={{
					paddingRight: '4rem',
					paddingLeft: '8rem',
					paddingTop: '2rem',
					paddingBottom: '2rem',
					height: '100%',
				}}
				className={`dashboardTemplate`}
			>
				<div
					style={{
						justifyContent: 'center',
						alignItems: 'center',
						flexDirection: 'column',
						marginRight:'6rem',
						marginLeft:'4rem'
					}}
					className="text-center"
				>
					<div style={{ padding: '1rem' }}>
						<h1>Predictions</h1>
					</div>
					<div style={{ padding: '2rem 1rem' }}>
						<h2>Regression Analysis</h2>
					</div>
					<div style={{ padding: '1rem' }}>
						<Linechart chartData={revenueForecast} hidden={false} />
					</div>
					<div style={{ padding: '1rem' }}>
						<Linechart chartData={inflation} hidden={false} />
					</div>

					<div style={{ padding: '2rem 1rem' }}>
						<h2>Temperature Forecast</h2>
					</div>
					<div style={{ padding: '1rem' }}>
						<Linechart
							chartData={weatherForecast}
							hidden={true}
							displayLegend={false}
							displayTitle={true}
							maintainAspectRatio={true}
							titleText="Temperature Forecast"
						/>
					</div>
					<div style={{ padding: '2rem 1rem' }}>
						<h2>Quantity Forecast by Category</h2>
					</div>
					<div style={{ padding: '1rem' }}>
						<Linechart
							chartData={quantityForecast}
							displayLegend={true}
							hidden={false}
							displayTitle={true}
							maintainAspectRatio={true}
							titleText="Category Quantity Forecast"
						/>
						<ExportExcel
							excelData={excelExportData}
							fileName={'Category Quantity Forecast'}
							buttonName={'Export Category Quantity Forecast Report'}
						/>
					</div>
				</div>
				{/* <div
					style={{}}
					className={`d-flex d-flex justify-content-baseline text-start leftDashboard`}
				>
					<Linechart chartData={regression} hidden={false} />
					<Linechart
						chartData={weatherForecast}
						hidden={true}
						displayLegend={false}
						displayTitle={true}
						maintainAspectRatio={true}
						titleText="Temperature Forecast"
					/>
				</div>
				<div
					className={`d-flex justify-content-between text-start rightDashboard`}
					style={{}}
				>
					<div style={{ paddingLeft: '1rem', height: '100vh' }}>
						<Linechart
							chartData={quantityForecast}
							displayLegend={true}
							hidden={false}
							displayTitle={true}
							maintainAspectRatio={true}
							titleText="Category Quantity Forecast"
						/>
					</div>
				</div> */}
			</div>
		</>
	);
}
