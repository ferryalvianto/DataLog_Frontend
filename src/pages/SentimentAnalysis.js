import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import Piechart from '../components/Charts/Piechart';
import axios from 'axios';

const SentimentAnalysis = () => {
	const API_URL = 'http://localhost:8000/api/';
	const [sentimentData, setSentimentData] = useState({
		labels: '',
		datasets: [],
	});

	useEffect(() => {
		axios.get(API_URL + 'sentiments').then((res) => {
			setSentimentData({
				...sentimentData,
				labels: res.data.map((element) => element._id),
				datasets: [
					{
						data: res.data.map((element) => element.Total_Count),
						backgroundColor: [
							'rgba(75,192,192,1)',
							'#ecf0f1',
							'#50AF95',
							'#f3ba2f',
							'#2a71d0',
						],
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
				style={{ width: 500, paddingLeft: '103px' }}
				className={`align-items-center dashboardTemplate`}
			>
				<Piechart chartData={sentimentData} />
			</div>
		</>
	);
};

export default SentimentAnalysis;
