import Navbar from '../components/navbar';
import { xLabels, yLabels } from '../TempData/HeatmapData';
import Heatmap from '../components/Charts/Heatmap';
import GaugeChart from '../components/Charts/Gaugechart';
import Barchart from '../components/Charts/Barchart';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";

export default function Analysis() {
	let { businessname } = useParams();

	const API_URL = 'http://localhost:8000/api/';
	const [wastage, setWastage] = useState({
		labels: '',
		datasets: [],
	});

	useEffect(() => {
		axios.get(API_URL + 'wastage').then((res) => {
			setWastage({
				...wastage,
				labels: res.data.map((element) => element._id),
				datasets: [
					{
						label: 'Wastage Product',
						data: res.data.map((element) => element.Total_Quantity),
						backgroundColor: '#50AF95',
						borderColor: 'black',
						borderWidth: 1,
					},
				],
			});
		});
	}, []);

	return (
		<>
			<Navbar />
			<div
				style={{ width: 1100, paddingLeft: '103px' }}
				className={`align-items-center dashboardTemplate`}
			>
				<h1>Market basket analysis</h1>
				<Heatmap xlabelsProp={xLabels} ylabelsProp={yLabels} />
			</div>

			<div
				style={{ width: 700, paddingLeft: '103px' }}
				className={`align-items-center dashboardTemplate`}
			>
				<h1>Transaction Speed</h1>
				<GaugeChart />
			</div>

			<div style={{ width: 1100, paddingLeft: '103px' }}>
				<Barchart
					chartData={wastage}
					displayLegend={false}
					displayTitle={true}
					titleText="Wastage Product"
				/>
			</div>
		</>
	);
}
