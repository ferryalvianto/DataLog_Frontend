import Navbar from '../components/navbar';
import { useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import BeFreshTrainModel from './businesses/befresh/befresh_train-model';

export default function TrainModel() {
	let params = useParams();
	let [user, setUser] = useState('')
	useEffect(() => {
		if ('user' in localStorage) {
			setUser(JSON.parse(localStorage.getItem('user')))
			if (params.businessname != JSON.parse(localStorage.getItem('user')).db.toLowerCase()) {
				sessionStorage.setItem('url', params.businessname)
				navigate('/badpage')
			}
		} else {
			navigate('/login')
		}
	}, [])

	return (
		<div id='trainmodeldiv'>
			<Navbar />

			{(user.db == 'BeFresh') && (<BeFreshTrainModel />)}

			{(user.db == 'DataLog') && (
				<div>
					<div style={{ paddingRight: '4rem', paddingLeft: '8rem', paddingTop: '2rem', paddingBottom: '2rem', height: '100vh' }} className={`dashboardTemplate`}>
						<div id='chooseDiv' style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }} className='text-center'>
							<div style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }} className='text-center'>
								<h1 style={{ fontSize: '800%', padding:'1rem' }}>􀥺</h1>
								<h1 style={{ padding: '1rem' }}>Nothing to see here...</h1>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}
