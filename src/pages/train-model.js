import Navbar from '../components/navbar';
import { useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';

export default function TrainModel() {
	let params = useParams();
	let file, user
	let reader = new FileReader(); //this for convert to Base64
	const navigate = useNavigate()
	let files = []
	let blobs = []

	useEffect(() => {
		if ('user' in localStorage) {
			user = JSON.parse(localStorage.getItem('user'))
			if (params.businessname != user.db.toLowerCase()) {
				sessionStorage.setItem('url', params.businessname)
				navigate('/badpage')
			}
		}
	}, [])


	function selectOption(e) {
		e.preventDefault()
		const option = e.target.value; 
		files = []

		if(option.includes('Action Log')){
			document.getElementById('actionlog').style.display = `block`
			document.getElementById('inventorylog').style.display = `none`
			document.getElementById('paymenttype').style.display = `none`
			document.getElementById('uploadFileBtn').style.display = `none`

		}
		
		if(option.includes('Payment Type')){
			document.getElementById('paymenttype').style.display = `block`
			document.getElementById('actionlog').style.display = `none`
			document.getElementById('inventorylog').style.display = `none`
			document.getElementById('uploadFileBtn').style.display = `none`

		}

		if(option.includes('Inventory Log')){
			document.getElementById('inventorylog').style.display = `block`
			document.getElementById('actionlog').style.display = `none`
			document.getElementById('paymenttype').style.display = `none`
			document.getElementById('uploadFileBtn').style.display = `none`
		}
	}

	function choosefile(e) {
		file = e.target.files[0]; //the file
		if (file && file.name.toLowerCase().includes('actionlog')) {
			files.push(file.name)
			blobs.push(file)
			document.getElementById('fileSelected').innerText = `Selected file: ${file.name}`
			document.getElementById('fileSelected').style.display = `block`
			// document.getElementById('paymenttype').style.display = `block`
			document.getElementById('uploadFileBtn').style.display = `flex`

			if (files.length > 1) {
				document.getElementById('uploadFile').innerText = `Upload ${files.join(', ')}`
			}
			else {
				document.getElementById('uploadFile').innerText = `Upload ${files.toString()}`
			}
		} else {
			alert('Please choose an Action Log Report')
		}
	}

	function choosefile2(e) {
		file = e.target.files[0]; //the file
		if (file && file.name.toLowerCase().includes('paymenttype')) {
			files.push(file.name)
			blobs.push(file)
			document.getElementById('fileSelected2').innerText = `Selected file: ${file.name}`
			document.getElementById('fileSelected2').style.display = `block`
			// document.getElementById('inventorylog').style.display = `block`
			document.getElementById('uploadFileBtn').style.display = `flex`
			if (files.length > 1) {
				document.getElementById('uploadFile').innerText = `Upload ${files.join(', ')}`
			}
			else {
				document.getElementById('uploadFile').innerText = `Upload ${files.toString()}`
			}
		} else {
			alert('Please choose a Payment Type Report')
		}
	}

	function choosefile3(e) {
		file = e.target.files[0]; //the file
		if (file && file.name.toLowerCase().includes('inventorylog')) {
			files.push(file.name)
			blobs.push(file)
			document.getElementById('fileSelected3').innerText = `Selected file: ${file.name}`
			document.getElementById('fileSelected3').style.display = `block`
			document.getElementById('uploadFileBtn').style.display = `flex`
			if (files.length > 1) {
				document.getElementById('uploadFile').innerText = `Upload ${files.join(', ')}`
			}
			else {
				document.getElementById('uploadFile').innerText = `Upload ${files.toString()}`
			}
		} else {
			alert('Please choose an Inventory Log Report')
		}
	}

	function uploadfile(e) {
		document.getElementById('uploadFileBtn').style.display = `none`
		document.getElementById('chooseDiv').style.display = `none`
		document.getElementById('filesconfimration').style.display = `none`

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
		}

	}

	return (
		<>
			<Navbar />
			<div style={{ paddingRight: '4rem', paddingLeft: '8rem', paddingTop: '2rem', paddingBottom: '2rem', height: '100vh' }} className={`dashboardTemplate`}>

				<div id='chooseDiv' style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }} className='text-center'>
					<h1 style={{ padding: '1rem' }}>Choose a CSV file to upload</h1>

					<h2 style={{ padding: '1rem' }}>Which file do you want to upload?</h2>
					<div style={{ width: '50%', display: 'inline-flex' }}>
						<select className='sel' style={{border: '2px solid black'}}onChange={(e) => selectOption(e)}>
							<option name="Action">Action Log</option>
							<option name="Payment">Payment Type</option>
							<option name="Inventory">Inventory Log</option>
						</select>
					</div>

					<div style={{ padding: '1rem', display: 'none'  }} id='actionlog'>
						<h3>Upload the Action Log Report</h3>
						<div className={`justify-content-between`} style={{ padding: '0.5rem', display: 'inline-flex' }}>
							<input
								type="file"
								accept=".csv"
								id="actionlogFile"
								style={{ visibility: "hidden", display: 'none' }}
								onChange={(e) => choosefile(e)}
							/>
							<button className={`btn bttn`} id='chooseFileBtn'>
								<label htmlFor="actionlogFile" style={{ width: '15rem', cursor: 'pointer' }}>
									Choose CSV
								</label>
							</button>
							<p id='fileSelected' style={{ width: '100%', paddingLeft: '2rem', justifySelf: 'center', alignSelf: 'center' }}>No files selected</p>
						</div>
					</div>

					<div style={{ padding: '1rem', display: 'none'  }} id='paymenttype'>
						<h3>Upload the Payment Type Report</h3>
						<div className={`justify-content-between`} style={{ padding: '0.5rem', display: 'inline-flex' }}>
							<input
								type="file"
								accept=".csv"
								id="paymenttypeFile"
								style={{ visibility: "hidden", display: 'none' }}
								onChange={(e) => choosefile2(e)}
							/>
							<button className={`btn bttn`} id='chooseFileBtn'>
								<label htmlFor="paymenttypeFile" style={{ width: '15rem', cursor: 'pointer' }}>
									Choose CSV
								</label>
							</button>
							<p id='fileSelected2' style={{ width: '100%', paddingLeft: '2rem', justifySelf: 'center', alignSelf: 'center' }}>No files selected</p>
						</div>
					</div>

					<div style={{ padding: '1rem', display: 'none' }} id='inventorylog'>
						<h3>Upload the Inventory Log Report</h3>
						<div className={`justify-content-between`} style={{ padding: '0.5rem', display: 'inline-flex' }}>
							<input
								type="file"
								accept=".csv"
								id="inventorylogFile"
								style={{ visibility: "hidden", display: 'none' }}
								onChange={(e) => choosefile3(e)}
							/>
							<button className={`btn bttn`} id='chooseFileBtn'>
								<label htmlFor="inventorylogFile" style={{ width: '15rem', cursor: 'pointer' }}>
									Choose CSV
								</label>
							</button>
							<p id='fileSelected3' style={{ width: '100%', paddingLeft: '2rem', justifySelf: 'center', alignSelf: 'center' }}>No files selected</p>
						</div>
					</div>
				</div>

				<div id='confirmationdiv' style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }} className='text-center'>
					<h5 id='filesconfimration'></h5>
				</div>

				<div className={`justify-content-between`} style={{ padding: '0.5rem', display: 'none' }} id='uploadFileBtn' >
					<button className={`btn bttn`} onClick={(e) => uploadfile(e)}>
						<label htmlFor="uploadFile" id='uploadFile' style={{ width: '50%', cursor: 'pointer' }}>
							Upload CSVs & Train Model
						</label>
					</button>
				</div>

				<div style={{ display: 'none', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: '8rem' }} className='text-center' id='loadingText'>
					<h1 style={{ fontSize: '800%' }}>􀌗</h1>
					{files.length > 1 ? (
						<h2 style={{ padding: '1rem' }}>Please wait, your CSV files are being uploaded to the cloud...</h2>
					) : (
						<h2 style={{ padding: '1rem' }}>Please wait, your CSV file is being uploaded to the cloud...</h2>
					)}
				</div>

				<div style={{ display: 'none', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: '8rem' }} className='text-center' id='doneText'>
					<h1 style={{ fontSize: '500%' }}>􀢓</h1>
					{files.length > 1 ? (
						<h2 style={{ padding: '1rem' }}>Your files have been uploaded to the cloud</h2>
					) : (
						<h2 style={{ padding: '1rem' }}>Your file has been uploaded to the cloud</h2>
					)}
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
