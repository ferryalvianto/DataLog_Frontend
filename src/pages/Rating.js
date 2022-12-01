import RatingForm from '../components/RatingForm';
import React, { useEffect, useState } from 'react';

const Rating = () => {

	useEffect(() => {
		if ((navigator.userAgent.match(/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i))) {
			document.getElementById('formdiv').style.paddingTop = '2rem'
			document.getElementById('formdiv').style.paddingBottom = '2rem'
		} else {
			document.getElementById('formdiv').style.padding = '2rem'
		}
	}, [])

	return (
		<div style={{ width: '100vw' }} id='formdiv'>
			<div id='formdiv' style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }} className='text-center'>
				<div style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }} className='text-center'>
					<RatingForm />
				</div>
			</div>
		</div>

	);
};

export default Rating;
