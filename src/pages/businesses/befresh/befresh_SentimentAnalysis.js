import React, { useState, useEffect } from 'react';
import Piechart from '../../../components/Charts/Piechart';
import axios from 'axios';

const BeFreshSentimentAnalysis = () => {
	const API_URL = 'https://datalogwebapp.herokuapp.com/datalog/api'
	// const API_URL = 'http://localhost:8000/datalog/api/';

	const [sentimentData, setSentimentData] = useState({
		labels: '',
		datasets: [],
	});

	useEffect(() => {
		axios
			.get(
				API_URL +
					'sentiments?db=' +
					JSON.parse(localStorage.getItem('user')).db.toString()
			)
			.then((res) => {
				console.log(res.data);
				setSentimentData({
					...sentimentData,
					labels: ['Very Dissatisfied','Dissatisfied', 'Neutral', 'Satisfied', 'Very Satisfied'],
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
						<h1>Sentiment Analysis</h1>
					</div>
					<div style={{ padding: '1rem' }}>
						<Piechart chartData={sentimentData} />
					</div>
				</div>
			</div>
		</>
	);
};

export default BeFreshSentimentAnalysis;
