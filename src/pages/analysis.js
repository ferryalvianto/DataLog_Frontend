import Navbar from '../components/navbar';
import { xLabels, yLabels } from '../TempData/HeatmapData';
import Heatmap from '../components/Charts/Heatmap';
import GaugeChart from '../components/Charts/Gaugechart';
import Barchart from '../components/Charts/Barchart';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import LeafletChart from '../components/Charts/LeafletChart';

export default function Analysis() {
	let { businessname } = useParams();

	const API_URL = 'https://datalogwebapp.herokuapp.com/api/';
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

			<div style={{ paddingRight: '4rem', paddingLeft: '8rem', paddingTop: '2rem', paddingBottom: '2rem', height: '100%' }} className={`dashboardTemplate`}>
				<div style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }} className='text-center'>
					<div style={{ padding: '1rem' }}>
						<h1>Analysis</h1>
					</div>

					<div style={{ padding: '2rem 1rem' }}>
						<h2>Market Basket Analysis</h2>
					</div>
					<div style={{ padding: '1rem 2rem' }}>
						<Heatmap xlabelsProp={xLabels} ylabelsProp={yLabels} />
					</div>

					<div style={{ padding: '2rem 1rem' }}>
						<h2>Transaction Speed</h2>
					</div>
					<div style={{ padding: '1rem 2rem' }}>
						<GaugeChart />
					</div>

					<div style={{ padding: '2rem 1rem' }}>
						<h2>Wastage Analysis</h2>
					</div>
					<div style={{ padding: '1rem 2rem' }}>
						<Barchart
							chartData={wastage}
							displayLegend={false}
							displayTitle={true}
							titleText="Wastage Product"
						/>
					</div>

					<div style={{ padding: '2rem 1rem' }}>
						<h2>Store Heatmap</h2>
					</div>
					<div style={{ padding: '1rem 2rem' }}>
						<LeafletChart />
					</div>

				</div>
			</div>
		</>
	);
}
