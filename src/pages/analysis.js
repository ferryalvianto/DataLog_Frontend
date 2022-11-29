import Navbar from '../components/navbar';
import { xLabels, yLabels } from '../TempData/HeatmapData';
import Heatmap from '../components/Charts/Heatmap';
import GaugeChart from '../components/Charts/Gaugechart';
import Barchart from '../components/Charts/Barchart';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Chart } from 'chart.js';
import { useNavigate, useParams } from 'react-router-dom';
import LeafletChart from '../components/Charts/LeafletChart';
import Table from 'react-bootstrap/Table';
import { map } from 'leaflet';

export default function Analysis() {
	let { businessname } = useParams();

	const API_URL = 'https://datalogwebapp.herokuapp.com/api/';
	const LOCAL_API_URL = 'http://localhost:8000/api/';

	const inputRef1 = useRef();
	const inputRef2 = useRef();

	const [general_products, setGeneralProducts] = useState([]);

	const [wastage, setWastage] = useState({
		labels: '',
		datasets: [],
	});

	const get_wastage_products = () => {
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
	};

	const get_general_products_api = () => {
		axios.get(LOCAL_API_URL + 'revenues').then((res) => {
			console.log(res.data);
			setGeneralProducts(res.data);
		});
	};

	useEffect(() => {
		get_wastage_products();
		get_general_products_api();
	}, []);

	const filterData = () => {
		let value1 = inputRef1.current.value;
		let value2 = inputRef2.current.value;

		axios
			.get(LOCAL_API_URL + 'revenues/?start_date=' + value1 + '&end_date=' + value2)
			.then((res) => {
				console.log(res.data);
				setGeneralProducts(res.data);
			});
	};

	const resetData = () => {
		axios.get(LOCAL_API_URL + 'revenues').then((res) => {
			console.log(res.data);
			setGeneralProducts(res.data);
		});
	};
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
					}}
					className="text-center"
				>
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
					<div style={{ padding: '2rem 1rem' }}>
						<h2>List Of Low-selling Products</h2>
						<br/>
						<input type="date" ref={inputRef1} />
						<input type="date" ref={inputRef2} />
						<button onClick={filterData}>Filter</button>
						<button onClick={resetData}>Reset</button>
					</div>
					<Table striped bordered hover>
						<thead>
							<tr>
								{/* <th>Category</th> */}
								{/* <th>Product Name</th> */}
								{/* <th>Quantity</th> */}
								{/* <th>Date</th> */}
								<th>Date</th>
								<th>Revenue</th>
							</tr>
						</thead>
						<tbody>
							{general_products.map((item, index) => (
								<tr key={index}>
									<td>{item.ymd}</td>
									<td>{item.revenue}</td>
								</tr>
							))}
						</tbody>
					</Table>
				</div>
			</div>
		</>
	);
}
