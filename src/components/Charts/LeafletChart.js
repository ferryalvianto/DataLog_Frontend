import L from 'leaflet';
import { MapContainer, ImageOverlay } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Leafletchart.css';
// import HeatmapLayer from "react-leaflet-heatmap-layer";
import { HeatmapLayer } from 'react-leaflet-heatmap-layer-v3';
// import { leafletData1 } from '../../TempData/LeafletData1';
import { leafletData } from '../../TempData/LeafletData';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';

const LeafletChart = () => {
	console.log(leafletData.map((element)=>element.coordinates));
	// const params = useParams();

	// let user = [];

	// const navigate = useNavigate();

	const API_URL = 'https://datalogwebapp.herokuapp.com/datalog/api/';
	// const API_URL = 'http://127.0.0.1:8000/datalog/api/';

	const [leafletData1, setLeafletData] = useState([]);

	const get_leaflet_api = () => {
		axios
			.get(
				API_URL +
				'heatmap/?db=BeFresh&start_date=2022-11-27&end_date=2022-11-27'
			)
			.then((res) => {
				console.log(res.data);
				setLeafletData(res.data);
			});
	};

	useEffect(() => {
		get_leaflet_api();
	}, []);

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
					points={leafletData1}
					longitudeExtractor={(m) => m.Coordinates[0]}
					latitudeExtractor={(m) => m.Coordinates[1]}
					intensityExtractor={(m)=>m.Total_Quantity}
				/>
			</MapContainer>
		</div>
	);
};
export default LeafletChart;