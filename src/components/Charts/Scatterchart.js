import React, { useState } from 'react';
import { Scatter } from 'react-chartjs-2';
import { Chart as chartjs } from 'chart.js/auto';

const Scatterchart = ({ chartData }) => {
	return <Scatter data={chartData} />;
};

export default Scatterchart;
