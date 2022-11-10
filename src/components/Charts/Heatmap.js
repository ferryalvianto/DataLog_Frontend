import React from 'react';
import HeatMap from 'react-heatmap-grid';

function Heatmap({ xlabelsProp, ylabelsProp }) {
	const data = new Array(ylabelsProp.length)
		.fill(0)
		.map(() =>
			new Array(xlabelsProp.length)
				.fill(0)
				.map(() => Math.floor(Math.random() * 100))
		);

	return (
		<div>
			<div className="box">
				<HeatMap
					// background={'#70c9f0'}
					// height={24}
					// squares={true}
					data={data}
					xLabels={xlabelsProp}
					yLabels={ylabelsProp}
					xLabelsLocation={'bottom'}
					yLabelWidth={90}
					yLabelTextAlign={'left'}
					cellStyle={(background, value, min, max, data, x, y) => ({
						background: `rgb(0, 151, 230, ${1 - (max - value) / (max - min)})`,
						fontSize: '11.5px',
						color: '#444',
					})}
					// cellRender={value => value && <div>{value}</div>} //show value of cell
					// onClick={(x, y) => alert(`Clicked ${x}, ${y}`)}
				/>
			</div>
		</div>
	);
}

export default Heatmap;
