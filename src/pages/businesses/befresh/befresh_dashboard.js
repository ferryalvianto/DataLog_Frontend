import BarchartFilterDate from '../../../components/Charts/BarchartFilterDate';
import Barchart from '../../../components/Charts/Barchart';
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Chart } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import Linechart from '../../../components/Charts/Linechart';
import { useNavigate, useParams } from 'react-router-dom';

export default function BeFreshDashboard() {
	const params = useParams();

	let user = [];

	const navigate = useNavigate();

	// const API_URL = 'https://datalogwebapp.herokuapp.com/datalog/api/';
	const API_URL = 'http://127.0.0.1:8000/datalog/api/';

	const inputRef1 = useRef();
	const inputRef2 = useRef();

	const [yesterdayRevenueCY, setYesterdayRevenueCY] = useState(0);
	const [yesterdayRevenueOA, setYesterdayRevenueOA] = useState(0);

	const [projectedRevenueCY, setProjectedRevenueCY] = useState(0);
	const [projectedRevenueOA, setProjectedRevenueOA] = useState(0);

	const [revenueForecast, setRevenueForecast] = useState({
		labels: '',
		datasets: [],
	});

	const [revenue, setRevenue] = useState({
		labels: '',
		datasets: [],
	});

	const [weatherForecast, setWeatherForecast] = useState({
		labels: '',
		datasets: [],
	});

	const getProjectedRevenue = () => {
		axios
			.get(API_URL + 'revenue_forecast', {
				params: {
					db: user.db,
				},
			})
			.then((res) => {
				console.log(res.data[0]);
				setProjectedRevenueCY(res.data[0].CY_predictedRevenue.toFixed(2));
				setProjectedRevenueOA(res.data[0].OA_predictedRevenue.toFixed(2));
			})
			.catch((e) => {
				console.log(e);
			});
	}

	const getYesterdayRevenue = () => {
		axios
			.get(API_URL + 'revenues', {
				params: {
					db: user.db,
				},
			})
			.then((res) => {
				console.log(res.data[12]);
				setYesterdayRevenueCY(res.data[13].dailyRevenue.toFixed(2));
				setYesterdayRevenueOA(res.data[12].dailyRevenue.toFixed(2));
			})
			.catch((e) => {
				console.log(e);
			});
	}

	const get_revenue_history_api = () => {
		axios
			.get(API_URL + 'revenues', {
				params: {
					db: user.db,
				},
			})
			.then((res) => {
				// console.log(res.data);
				setRevenue({
					...revenue,
					labels: res.data.map((element) => element.Date),
					datasets: [
						{
							label: 'Be Fresh',
							data: res.data.map((element) =>
								element.Establishment == 1 ? element.dailyRevenue : 0
							),
							backgroundColor: 'rgba(54, 162, 235,0.8)',
							borderColor: 'black',
							borderWidth: 1,
						},
						{
							label: 'Organic Acres',
							data: res.data.map((element) =>
								element.Establishment == 0 ? element.dailyRevenue : 0
							),
							backgroundColor: '#006400',
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

	const get_revenue_forecast_api = () => {
		axios
			.get(API_URL + 'revenue_forecast', {
				params: {
					db: user.db,
				},
			})
			.then((res) => {
				console.log(res.data);
				setRevenueForecast({
					...revenueForecast,
					labels: res.data.map((element) => element.date),
					datasets: [
						{
							label: 'Be Fresh',
							data: res.data.map((element) => element.CY_predictedRevenue),
							backgroundColor: 'rgba(54, 162, 235,0.8)',
							borderColor: 'black',
							borderWidth: 1,
						},
						{
							label: 'Organic Acres',
							data: res.data.map((element) => element.OA_predictedRevenue),
							backgroundColor: '#006400',
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
		axios
			.get(API_URL + 'forecasted_weather')
			.then((res) => {
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
					getProjectedRevenue();
					getYesterdayRevenue();
					get_revenue_history_api();
					get_revenue_forecast_api();
					get_weather_forecast_api();
				}
			}
		} else {
			navigate('/home');
			window.location.reload();
		}
	}, []);

	const filterData = () => {
		let value1 = inputRef1.current.value;
		let value2 = inputRef2.current.value;
		console.log(inputRef1);
		console.log(inputRef1.current.value);
		axios
			.get(
				API_URL +
				'revenues/?db=' +
				JSON.parse(localStorage.getItem('user')).db.toString() +
				'&start_date=' +
				value1 +
				'&end_date=' +
				value2
			)
			.then((res) => {
				// console.log(res.data);
				setRevenue({
					...revenue,
					labels: res.data.map((element) => element.Date),
					datasets: [
						{
							label: 'Be Fresh',
							data: res.data.map((element) =>
								element.Establishment == 0 ? element.dailyRevenue : 0
							),
							backgroundColor: 'rgba(54, 162, 235,0.8)',
							borderColor: 'black',
							borderWidth: 1,
						},
						{
							label: 'Organic Acres',
							data: res.data.map((element) =>
								element.Establishment == 1 ? element.dailyRevenue : 0
							),
							backgroundColor: '#006400',
							borderColor: 'black',
							borderWidth: 1,
						},
					],
				});
			});
	};

	const resetData = () => {
		axios
			.get(
				API_URL +
				'revenues?db=' +
				JSON.parse(localStorage.getItem('user')).db.toString()
			)
			.then((res) => {
				console.log(res.data);
				setRevenue({
					...revenue,
					labels: res.data.map((element) => element.Date),
					datasets: [
						{
							label: 'Be Fresh',
							data: res.data.map((element) =>
								element.Establishment == 0 ? element.dailyRevenue : 0
							),
							backgroundColor: 'rgba(54, 162, 235,0.8)',
							borderColor: 'black',
							borderWidth: 1,
						},
						{
							label: 'Organic Acres',
							data: res.data.map((element) =>
								element.Establishment == 1 ? element.dailyRevenue : 0
							),
							backgroundColor: '#006400',
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

	Chart.register(zoomPlugin);

	return (
		<>
			<div style={{}} className={`d-flex align-items-center dashboardTemplate`}>
				<div
					className={`d-flex d-flex justify-content-baseline text-start leftDashboard`}
					style={{}}
				>
					<div
						className={`d-flex justify-content-between text-start`}
						style={{ flexDirection: 'column', marginLeft: '4rem', marginRight: '1rem' }}
					>
						<h1>Overview</h1>
						<h6 style={{ marginTop: '5px', marginLeft: '1px' }}>
							Hello, <strong>{`${JSON.parse(localStorage.getItem('user')).firstname}`}</strong>! 👋
						</h6>
						<div
							style={{
								flexDirection: 'row',
								marginTop: '2rem',
								marginBottom: '2rem',
							}}
							className={`d-flex align-items-center`}
						>
							<div className={`card card-container`} id={`smallCard`}>
								<h4 style={{ margin: '1.3pt' }}><strong>Yesterday's Revenue</strong></h4>
								<h5 style={{ margin: '1.3pt' }}>Be Fresh: <strong>${yesterdayRevenueCY}</strong></h5>
								<h5 style={{ margin: '1.3pt' }}>Organic Arces: <strong>${yesterdayRevenueOA}</strong></h5>
							</div>
							<div className={`card card-container`} id={`smallCard`}>
								<h4 style={{ margin: '1.3pt' }}><strong>Today's Projected Revenue</strong></h4>
								<h5 style={{ margin: '1.3pt' }}>Be Fresh:  <strong>${projectedRevenueCY}</strong></h5>
								<h5 style={{ margin: '1.3pt' }}>Organic Arces:  <strong>${projectedRevenueOA}</strong></h5>
							</div>
						</div>
						<div style={{ marginTop: '3rem', width: 600 }}>
							<Barchart
								chartData={revenue}
								displayLegend={true}
								displayTitle={true}
								titleText="Revenue History"
							/>
							<input type="date" ref={inputRef1} />
							<input type="date" ref={inputRef2} />
							<button onClick={filterData}>Filter</button>
							<button onClick={resetData}>Reset</button>
						</div>
					</div>


				</div>
				<div
					className={`d-flex justify-content-between text-start rightDashboard`}
					style={{ marginLeft: '4rem', marginRight: '1rem' }}
				>
					<div style={{ paddingLeft: '1rem', }}>
						<h1>Today's Prediction</h1>
						<div style={{ marginTop: '2rem', marginBottom: '2rem', }}>
							<div style={{ width: 600 }}>
								<Barchart
									chartData={revenueForecast}
									displayLegend={true}
									displayTitle={true}
									titleText="Revenue Forecast"
								/>
							</div>
							<div style={{ width: 600 }}>
								<Linechart
									chartData={weatherForecast}
									hidden={true}
									displayLegend={false}
									displayTitle={true}
									maintainAspectRatio={true}
									titleText="Temperature Forecast (°C)"
								/>
							</div>
						</div>

					</div>
				</div>
			</div>
		</>
	);
}
