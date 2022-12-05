import React, { useState, useEffect, useRef } from 'react';
import { Chart as chartjs } from 'chart.js/auto';
import GaugeChart from 'react-gauge-chart';
import { GaugeData } from '../../TempData/GaugeData';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const Gaugechart = () => {
	const API_URL = 'https://datalogwebapp.herokuapp.com/datalog/api/'
	// const API_URL = 'http://127.0.0.1:8000/datalog/api/';

	const [data,setData]=useState([]);
	const [gaugeData, setGaugeData] = useState(0);
	const [name, setName] = useState('Employee name');

	const getData = () => {
		axios
			.get(
				API_URL +
					'employee_productivity?db=' +
					JSON.parse(localStorage.getItem('user')).db.toString()
			)
			.then((res) => {
				console.log(res.data);
				setData(res.data);
			});
	};

	useEffect(() => {
		getData();
	}, []);

	const handleClick = (index) => {
		setGaugeData(data[index].ItemPerSecond.toFixed(3));
		setName(data[index].Employee);
	};
	return (
		<>
			<div style={{ height: '100%', width: '50%', display: 'inline-block' }}>
				<GaugeChart
					// id="gauge-chart8"
					// nrOfLevels={7}
					colors={['#66CCFF', '#0000CC']}
					// arcWidth={0.3}
					formatTextValue={(value) => value/100}
					percent={gaugeData}
					textColor={'#000000'}
				/>
				<DropdownButton id="dropdown-item-button" title={name}>
					{data.map((element, index) => (
						<Dropdown.Item as="button" onClick={() => handleClick(index)}>
							{element.Employee}
						</Dropdown.Item>
					))}
				</DropdownButton>
			</div>
		</>
	);
};

export default Gaugechart;
