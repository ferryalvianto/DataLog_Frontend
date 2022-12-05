import { xLabels, yLabels } from '../../../TempData/HeatmapData';
import Heatmap from '../../../components/Charts/Heatmap';
import GaugeChart from '../../../components/Charts/Gaugechart';
import Barchart from '../../../components/Charts/Barchart';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Chart } from 'chart.js';
import { useNavigate, useParams } from 'react-router-dom';
import LeafletChart from '../../../components/Charts/LeafletChart';
import Table from 'react-bootstrap/Table';

export default function BeFreshAnalysis() {
	// let { businessname } = useParams();
	const params = useParams();
	let user = [];

	// const API_URL = 'https://datalogwebapp.herokuapp.com/datalog/api/'
	const API_URL = 'http://127.0.0.1:8000/datalog/api/';

	const inputRef1 = useRef();
	const inputRef2 = useRef();

	const [general_products, setGeneralProducts] = useState([]);

	const [wastage, setWastage] = useState({
		labels: '',
		datasets: [],
	});

	const get_wastage_products = () => {
		axios
			.get(API_URL + 'wastage', {
				params: {
					db: user.db,
				},
			})
			.then((res) => {
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
		axios
			.get(API_URL + 'general_products', {
				params: {
					db: user.db,
				},
			})
			.then((res) => {
				setGeneralProducts(res.data);
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
					get_wastage_products();
					get_general_products_api();
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

		axios
			.get(
				API_URL +
					'general_products_by_date?db=' +
					JSON.parse(localStorage.getItem('user')).db.toString() +
					'&start_date=' +
					value1 +
					'&end_date=' +
					value2
			)
			.then((res) => {
				console.log(res.data);
				setGeneralProducts(res.data);
			});
	};

	const resetData = () => {
		axios
		.get(
			API_URL +
				'general_products?db=' +
				JSON.parse(localStorage.getItem('user')).db.toString()
		)
			.then((res) => {
				setGeneralProducts(res.data);
			});
	};

	return (
		<>
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
						<h1>Analysis</h1>
					</div>

					{/* <div style={{ padding: '2rem 1rem' }}>
						<h2>Market Basket Analysis</h2>
					</div>
					<div style={{ padding: '1rem 2rem' }}>
						<Heatmap xlabelsProp={xLabels} ylabelsProp={yLabels} />
					</div> */}

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
						<br />
						<input type="date" ref={inputRef1} />
						<input type="date" ref={inputRef2} />
						<button onClick={filterData}>Filter</button>
						<button onClick={resetData}>Reset</button>
					</div>
					<Table striped bordered hover>
						<thead>
							<tr>
								<th>Category</th>
								<th>Product Name</th>
								<th>Quantity</th>
								<th>Date</th>
							</tr>
						</thead>
						<tbody>
							{general_products.map((item, index) => (
								<tr key={index}>
									<td>{item.Category}</td>
									<td>{item.Name}</td>
									<td>{item.Quantity}</td>
									<td>{item.Date}</td>
								</tr>
							))}
						</tbody>
					</Table>
				</div>
			</div>
		</>
	);
}
