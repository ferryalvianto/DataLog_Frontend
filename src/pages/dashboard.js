import Navbar from '../components/navbar';
import BarchartFilterDate from '../components/Charts/BarchartFilterDate';
import Barchart from '../components/Charts/Barchart';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import Linechart from '../components/Charts/Linechart';
import { useNavigate, useParams } from "react-router-dom";

export default function Dashboard() {
	const params = useParams();

	const [newUser, setNewUser] = useState(false)
	let user = []

	const navigate = useNavigate()

	const API_URL = 'http://localhost:8000/api/';
	const [revenueHistoryLabel, setRevenueHistoryLabel] = useState([]);
	const [revenueHistoryData, setRevenueHistoryData] = useState([]);

	const [revenueForecast, setRevenueForecast] = useState({
		labels: '',
		datasets: [],
	});

	const [quantityForecast, setQuantityForecast] = useState({
		labels: '',
		datasets: [],
	});

	const [weatherForecast, setWeatherForecast] = useState({
		labels: '',
		datasets: [],
	});

	useEffect(() => {
		if ('user' in localStorage) {
			user = JSON.parse(localStorage.getItem('user'))
			if (params.businessname != user.db.toLowerCase()) {
				sessionStorage.setItem('url', params.businessname)
				navigate('/badpage')
			} else {
				if ('user' in localStorage && (params.businessname == user.db.toLowerCase())) {
					sessionStorage.clear()
					setNewUser(user.newuser)
					axios.get(API_URL + 'revenues').then((res) => {
						setRevenueHistoryLabel(res.data.map((element) => element.ymd));
						setRevenueHistoryData(res.data.map((element) => element.dailyRevenue));
					});
					axios.get(API_URL + 'revenue_forecast').then((res) => {
						setRevenueForecast({
							...revenueForecast,
							labels: res.data.map((element) => element.Date),
							datasets: [
								{
									label: 'Revenue Forecast',
									data: res.data.map((element) => element.PredictedRevenue),
									backgroundColor: 'rgba(54, 162, 235,0.8)',
									borderColor: 'black',
									borderWidth: 1,
								},
							],
						});
					});
					axios.get(API_URL + 'quantity_forecast').then((res) => {
						setQuantityForecast({
							...quantityForecast,
							labels: res.data.map((element) => element.Date),
							datasets: [
								{
									label: 'Dairy',
									data: res.data.map((element) => element.predicted_quantity),
									backgroundColor: '#DAA520',
									borderColor: '#FFD700',
								},
							],
						});
					});
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
				}
			}
		} else {
			navigate('/')
			window.location.reload()
		}


	}, []);

	Chart.register(zoomPlugin);

	return (
		<>
			<Navbar />
			<div style={{}} className={`d-flex align-items-center dashboardTemplate`}>
				<div
					className={`d-flex d-flex justify-content-baseline text-start leftDashboard`}
					style={{}}
				>
					<div
						className={`d-flex justify-content-between text-start`}
						style={{ flexDirection: 'column' }}
					>
						<h1>Overview</h1>
						<h6 style={{ marginTop: '5px', marginLeft: '1px' }}>
							Good morning, {`${user.firstname}`}! 👋
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
								<h5 style={{ margin: '1.3pt' }}>Yesterday's Revenue</h5>
								<h5 style={{ margin: '1.3pt' }}>$21,500</h5>
								<h5 style={{ margin: '1.3pt', color: 'green' }}>􀄯 12%</h5>
							</div>
							<div className={`card card-container`} id={`smallCard`}>
								<h5 style={{ margin: '1.3pt' }}>Projected Revenue</h5>
								<h5 style={{ margin: '1.3pt' }}>$19,780</h5>
								<h5 style={{ margin: '1.3pt', color: 'red' }}>􀄯 8%</h5>
							</div>
						</div>
					</div>

					<div style={{ width: 500 }}>
						<BarchartFilterDate
							initialDate={revenueHistoryLabel}
							initialDataPoint={revenueHistoryData}
							label={'Revenue'}
						/>
					</div>
				</div>
				<div
					className={`d-flex justify-content-between text-start rightDashboard`}
					style={{}}
				>
					<div style={{ paddingLeft: '1rem' }}>
						<h1>Today's Prediction</h1>
						<div style={{ width: 500 }}>
							<Barchart
								chartData={revenueForecast}
								displayLegend={false}
								displayTitle={true}
								titleText="Revenue Forecast"
							/>
						</div>
						<div style={{ width: 500 }}>
							<Linechart
								chartData={quantityForecast}
								hidden={true}
								displayTitle={true}
								titleText="Category Quantity Forecast"
							/>
						</div>
						<div style={{ width: 500 }}>
							<Linechart
								chartData={weatherForecast}
								hidden={true}
								displayLegend={false}
								displayTitle={true}
								titleText="Temperature Forecast"
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}