import React from 'react';
import L from 'leaflet';
import { MapContainer, ImageOverlay } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Leafletchart.css';
import { HeatmapLayer } from 'react-leaflet-heatmap-layer-v3';
import { leafletData } from '../../TempData/LeafletData';

const LeafletChart = () => {
	return (
		<div style={{ height: '100%', width: '80%', display: 'inline-block' }}>
			<MapContainer
				crs={L.CRS.Simple}
				bounds={[
					[100, 0],
					[0, 100],
				]}
			>
				<HeatmapLayer
					points={leafletData}
					longitudeExtractor={(m) => m.coordinates[0]}
					latitudeExtractor={(m) => m.coordinates[1]}
					intensityExtractor={(m) => m.quantity}
				/>
				<ImageOverlay
					url={require('../../Assets/Images/grocery_map.jpeg')}
					bounds={[
						[100, 0],
						[0, 100],
					]}
				/>
				<HeatmapLayer
					points={leafletData}
					longitudeExtractor={(m) => m.coordinates[0]}
					latitudeExtractor={(m) => m.coordinates[1]}
					intensityExtractor={(m) => m.quantity}
				/>
			</MapContainer>
		</div>
	);
};
export default LeafletChart;