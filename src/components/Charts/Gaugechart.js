import React, { useState, useEffect, useRef } from 'react';
import { Chart as chartjs } from 'chart.js/auto';
import GaugeChart from 'react-gauge-chart';
import { GaugeData } from '../../TempData/GaugeData';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import 'bootstrap/dist/css/bootstrap.min.css';

const Gaugechart = () => {
	// const API_URL = 'https://datalogwebapp.herokuapp.com/datalog/api/'
	const API_URL = 'http://127.0.0.1:8000/datalog/api/';
	
	const [gaugeData, setGaugeData] = useState(0);
	const [name, setName] = useState('Employee name');

	// const getName=()=>{
	// 	axios.get(API_URL + 'employee_productivity?db='+ 
	// 	JSON.parse(localStorage.getItem('user')).db.toString() )
	// 	.then((res) => {
	// 		console.log(res.data);
	// 		// setName({
	// 		// 	...name,
	// 		// 	labels: res.data.map((element) => element._id),
	// 		// 	datasets: [
	// 		// 		{
	// 		// 			label: 'Wastage Product',
	// 		// 			data: res.data.map((element) => element.Total_Quantity),
	// 		// 			backgroundColor: '#50AF95',
	// 		// 			borderColor: 'black',
	// 		// 			borderWidth: 1,
	// 		// 		},
	// 		// 	],
	// 		// });
	// 	});
	// }

	// useEffect(() => {
	// 	if ('user' in localStorage) {
	// 		user = JSON.parse(localStorage.getItem('user'));
	// 		if (params.businessname != user.db.toLowerCase()) {
	// 			sessionStorage.setItem('url', params.businessname);
	// 			navigate('/badpage');
	// 			window.location.reload();
	// 		} else {
	// 			if (
	// 				'user' in localStorage &&
	// 				params.businessname == user.db.toLowerCase()
	// 			) {
	// 				sessionStorage.clear();
	// 				getName();
	// 			}
	// 		}
	// 	} else {
	// 		navigate('/home');
	// 		window.location.reload();
	// 	}
	// }, []);

	
	const handleClick = (index) => {
		setGaugeData(GaugeData[index].transactionSpeed);
		setName(GaugeData[index].employeeName);
	};
	return (
		<>
			<div style={{ height: '100%', width: '50%', display: 'inline-block' }} >

				<GaugeChart
					id="gauge-chart3"
					nrOfLevels={7}
					colors={['#66CCFF', '#0000CC']}
					arcWidth={0.3}
					percent={gaugeData}
					textColor={'#000000'}
				/>
				<DropdownButton id="dropdown-item-button" title={name}>
					{GaugeData.map((element, index) => (
						<Dropdown.Item as="button" onClick={() => handleClick(index)}>
							{element.employeeName}
						</Dropdown.Item>
					))}
				</DropdownButton>
			</div>

		</>
	);
};

export default Gaugechart;
