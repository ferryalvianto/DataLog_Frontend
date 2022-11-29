import React from 'react';
import RatingForm from '../components/RatingForm';

const Rating = () => {
	return (
		<div style={{ padding: '2rem', width: '100vw' }}>
			<div id='formdiv' style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }} className='text-center'>
				<div style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }} className='text-center'>
					<RatingForm />
				</div>
			</div>
		</div>

	);
};

export default Rating;
