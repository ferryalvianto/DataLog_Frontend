import Navbar from '../components/navbar';
import { useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';

export default function TrainModel() {
	let params = useParams();
	let file, user
	let reader = new FileReader(); //this for convert to Base64
	const navigate = useNavigate()

	useEffect(() => {
		if ('user' in localStorage) {
			user = JSON.parse(localStorage.getItem('user'))
			if (params.businessname != user.db.toLowerCase()) {
				sessionStorage.setItem('url', params.businessname)
				navigate('/badpage')
			}
		}
	}, [])

	function choosefile(e) {
		file = e.target.files[0]; //the file
		if (file) {
			document.getElementById('fileSelected').innerText = `Selected file: ${file.name}`
			document.getElementById('fileSelected').style.display = `block`
			document.getElementById('uploadFileBtn').style.display = `flex`
			document.getElementById('uploadFile').innerText = `Upload ${file.name} & Train Model`
		}
	}

	function uploadfile(e) {
		document.getElementById('uploadFileBtn').style.display = `none`
		document.getElementById('chooseDiv').style.display = `none`

		reader.readAsDataURL(file); //start conversion...
		reader.onload = function (e) {
			document.getElementById('loadingText').style.display = `block`

			//.. once finished..
			var rawLog = reader.result.split(',')[1]; //extract only the file data part
			var dataSend = {
				dataReq: { data: rawLog, name: file.name, type: file.type },
				fname: 'uploadFilesToGoogleDrive',
			}; //preapre info to send to API
			fetch(
				'https://script.google.com/macros/s/AKfycbw0dR0qBlv03k5b0Pv8GZlNTMm94XGpJfEL9jE4bLI8BToI_NrWoU9giC0RVNPbBSCJAw/exec', //your AppsScript URL
				{ method: 'POST', body: JSON.stringify(dataSend) }
			) //send to Api
				.then((res) => res.json())
				.then((response) => {
					console.log(response); //See response
					document.getElementById('loadingText').style.display = `none`
					document.getElementById('doneText').style.display = `block`
				})
				.catch((e) => console.log(e)); // Or Error in console
		};
	}

	return (
		<>
			<Navbar />
			<div style={{ paddingRight: '4rem', paddingLeft: '8rem', paddingTop: '2rem', paddingBottom: '2rem', height: '100vh' }} className={`dashboardTemplate`}>
				{/* <h1>Which model do you want to train?</h1> */}
				<div id='chooseDiv' style={{ display: 'block' }}>
					<h1>Choose a CSV file to upload</h1>
					<div className={`justify-content-between`} style={{ padding: '0.5rem', display: 'flex' }}>
						<input
							type="file"
							accept=".csv"
							id="customFile"
							style={{ visibility: "hidden", display: 'none' }}
							onChange={(e) => choosefile(e)}
						/>
						<button className={`btn bttn`} id='chooseFileBtn'>
							<label htmlFor="customFile" style={{ width: '15rem', cursor: 'pointer' }}>
								Choose CSV
							</label>
						</button>
						<p id='fileSelected' style={{ width: '100%', paddingLeft: '2rem', justifySelf: 'center', alignSelf: 'center' }}>No files selected</p>
					</div>
				</div>

				<div className={`justify-content-between`} style={{ padding: '0.5rem', display: 'none' }} id='uploadFileBtn' >
					<button className={`btn bttn`} onClick={(e) => uploadfile(e)}>
						<label htmlFor="uploadFile" id='uploadFile' style={{ width: '100%', cursor: 'pointer' }}>
							Upload CSV & Train Model
						</label>
					</button>
				</div>

				<div style={{ display: 'none', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: '25rem' }} className='text-center' id='loadingText'>
					<h1 style={{ fontSize: '800%' }}>􀌗</h1>
					<h2 style={{ padding: '1rem' }}>Please wait, your CSV file is being uploaded to the cloud...</h2>
				</div>

				<div style={{ display: 'none', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: '25rem' }} className='text-center' id='doneText'>
					<h1 style={{ fontSize: '800%' }}>􀢓</h1>
					<h2 style={{ padding: '1rem' }}>Your file has been uploaded to the cloud</h2>
					<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
						<button className={`btn bttn2`}
							onClick={() => {
								const user = JSON.parse(localStorage.getItem('user'))
								const url = (user.db.toLowerCase())
								navigate(`/${url}/dashboard`)
							}}>
							<label htmlFor="goToDashboard" style={{ width: '100%', cursor: 'pointer' }}>
								Go to Dashboard
							</label>
						</button>
						<div style={{ padding: '1rem' }}></div>
						<button className={`btn bttn`} onClick={(e) => window.location.reload()}>
							<label htmlFor="uploadFile" id='uploadFileAgain' style={{ width: '100%', cursor: 'pointer' }}>
								Upload Another File
							</label>
						</button>
					</div>
				</div>

			</div>
		</>
	);
}
