import L from 'leaflet';
import { MapContainer, ImageOverlay } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Leafletchart.css';
// import HeatmapLayer from "react-leaflet-heatmap-layer";
import { HeatmapLayer } from 'react-leaflet-heatmap-layer-v3';
import { leafletData1 } from '../../TempData/LeafletData1';
import { leafletData } from '../../TempData/LeafletData';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';

const LeafletChart = () => {
	console.log(leafletData.map((element)=>element.coordinates));
	// const params = useParams();

	// let user = [];

	// const navigate = useNavigate();

	// // const API_URL = 'https://datalogwebapp.herokuapp.com/datalog/api/';
	// const API_URL = 'http://127.0.0.1:8000/datalog/api/';

	// const [leafletData, setLeafletData] = useState([]);

	// const get_leaflet_api = () => {
	// 	axios
	// 		.get(API_URL + 'heatmap', {
	// 			params: {
	// 				db: user.db,
	// 			},
	// 		})
	// 		.then((res) => {
	// 			console.log(res.data);
	// 			setLeafletData(res.data);
	// 		});
	// };

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
	// 				get_leaflet_api();
	// 			}
	// 		}
	// 	} else {
	// 		navigate('/home');
	// 		window.location.reload();
	// 	}
	// }, []);

	return (
		<div style={{ height: '100%', width: '80%', display: 'inline-block' }}>
			<MapContainer
				crs={L.CRS.Simple}
				bounds={[
					[100, 0],
					[0, 100],
				]}
			>
				<ImageOverlay
					url={require('../../Assets/Images/cy.png')}
					bounds={[
						[100, 0],
						[0, 100],
					]}
				/>
				<HeatmapLayer
					points={leafletData}
					longitudeExtractor={(m) => m.coordinates[0]}
					latitudeExtractor={(m) => m.coordinates[1]}
					intensityExtractor={(m)=>m.quantity}
				/>
			</MapContainer>
		</div>
	);
};
export default LeafletChart;