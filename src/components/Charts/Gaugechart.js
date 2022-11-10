import React, { useState } from 'react';
import { Chart as chartjs } from 'chart.js/auto';
import GaugeChart from 'react-gauge-chart';
import { GaugeData } from '../../TempData/GaugeData';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import 'bootstrap/dist/css/bootstrap.min.css';

const Gaugechart = () => {
	const [gaugeData, setGaugeData] = useState(0);
	const [name, setName]=useState('Employee name');
	const handleClick = (index) => {
		setGaugeData(GaugeData[index].transactionSpeed);
		setName(GaugeData[index].employeeName);
	};
	return (
		<>
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
		</>
	);
};

export default Gaugechart;
