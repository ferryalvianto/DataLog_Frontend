import Navbar from '../components/navbar';
import { useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import userService from "../services/user.service"

export default function TrainModel() {
	let params = useParams();
	let file, id_paymenttype, id_inventorylog, year, month, day, dateValue
	let reader = new FileReader()
	const navigate = useNavigate()
	let [user, setUser] = useState('')
	let [todo, setTodo] = useState('Upload CSV files for Organic Acres and Be Fresh to train models')
	let [bf, setBF] = useState(false)
	let [oa, setOA] = useState(false)

	let today = new Date();
	let dd = String(today.getDate()).padStart(2, '0');
	let mm = String(today.getMonth() + 1).padStart(2, '0')
	let yyyy = today.getFullYear();
	today = mm + '/' + dd + '/' + yyyy;

	useEffect(() => {
		if ('user' in localStorage) {
			setUser(JSON.parse(localStorage.getItem('user')))
			if (params.businessname != JSON.parse(localStorage.getItem('user')).db.toLowerCase()) {
				sessionStorage.setItem('url', params.businessname)
				navigate('/badpage')
			}
			// else {
			// 	userService.getUploadLog(JSON.parse(localStorage.getItem('user')).db.toString(), yyyy.toString(), mm.toString(), dd.toString())
			// 		.then((resp) => {
			// 			console.log(resp.data)
			// 			if (resp.data == '1') {
			// 				setTodo('Upload CSV files for Organic Acres to train models.')
			// 				setBF(true)
			// 			}
			// 			else if (resp.data == '0') {
			// 				setTodo('Upload CSV files for Be Fresh-Cypress to train models.')
			// 				setOA(true)
			// 			}
			// 			else if (resp.data == 'Train models now.') {
			// 				setTodo('Train models now')
			// 				setOA(true)
			// 				setBF(true)
			// 				document.getElementById('doneText').style.display = `block`
			// 				document.getElementById('uploadSuccess').style.display = `block`
			// 				document.getElementById('trainBtn').style.display = `block`
			// 				document.getElementById('uploadAnotherBtn').style.display = `none`
			// 				document.getElementById('datediv').style.display = `none`
			// 			}
			// 			else {
			// 				setTodo('Upload CSV files for Organic Acres and Be Fresh to train models')
			// 			}
			// 		})
			// 		.catch((err) => {
			// 			console.log(err)
			// 		})
			// }
		} else {
			navigate('/login')
		}
	}, [])

	const onChangeDate = (e) => {
		dateValue = e.target.value
		year = dateValue.substring(0, 4)
		month = dateValue.substring(5, 7)
		day = dateValue.substring(8, 10)
		console.log(month + day + year)
		checkLog()
	}

	function checkLog() {
		userService.getUploadLog(JSON.parse(localStorage.getItem('user')).db.toString(), year.toString(), month.toString(), day.toString())
			.then((resp) => {
				console.log(resp.data)

				if (resp.data == '1') {
					setTodo('Upload CSV files for Organic Acres to train models.')
					setBF(true)
				}
				else if (resp.data == '0') {
					setTodo('Upload CSV files for Be Fresh-Cypress to train models.')
					setOA(true)
				}
				else if (resp.data == 'Train models now.') {
					setTodo('Train models now')
					setOA(true)
					setBF(true)
					document.getElementById('doneText').style.display = `block`
					document.getElementById('uploadSuccess').style.display = `block`
					document.getElementById('trainBtn').style.display = `block`
					document.getElementById('uploadAnotherBtn').style.display = `none`
					document.getElementById('datediv').style.display = `none`
				}
				else {
					setTodo('Upload CSV files for Organic Acres and Be Fresh to train models')
				}

				if (!bf || !oa) {
					document.getElementById('paymenttype').style.display = `block`
				}
				if (resp.data == '0' && !bf) {
					document.getElementById('paymenttype').style.display = `block`
					document.getElementById('paymentuploadtxt').innerText = `Upload the Payment Summary Report for Be Fresh`
					document.getElementById('invetoryuploadtxt').innerText = `Upload the Inventory Log Report for Organic Acres`
				}
				if (resp.data == '1' && !oa) {
					document.getElementById('paymenttype').style.display = `block`
					document.getElementById('paymentuploadtxt').innerText = `Upload the Payment Summary Report for Organic Acres`
					document.getElementById('invetoryuploadtxt').innerText = `Upload the Inventory Log Report for Be Fresh`
				}
				// else {
				// 	alert('You have uploaded CSV files for the selected dates.')
				// }
			})
			.catch((err) => {
				console.log(err)
			})
	}

	// function choosefile(e) {
	// 	file = e.target.files[0]
	// 	if (file && file.name.toLowerCase().includes('actionlog')) {
	// 		document.getElementById('fileSelected').innerText = `Selected file: ${file.name}`
	// 		document.getElementById('fileSelected').style.display = `block`
	// 		document.getElementById('uploadFileBtn').style.display = `flex`
	// 		document.getElementById('uploadFile').innerText = `Upload ${file.name}`
	// 	} else {
	// 		alert('Please choose an Action Log Report')
	// 	}
	// }

	function choosefile2(e) {
		file = e.target.files[0]

		if (!bf && !oa) {
			if (file && file.name.includes('Payment_Summary_')) {
				if (file.name.includes(month + '_' + day + '_' + year)) {
					document.getElementById('fileSelected2').innerText = `Selected file: ${file.name}`
					document.getElementById('fileSelected2').style.display = `block`
					document.getElementById('uploadFileBtn').style.display = `flex`
					document.getElementById('uploadFile').innerText = `Upload ${file.name}`
				}
				else {
					alert('Report date does not match with the date you selected previously.')
				}
			} else {
				alert('Please choose a Payment Summary Report')
			}
		}

		if (!bf && oa) {
			if (file && file.name.includes('Payment_Summary_') && file.name.includes('Be_Fresh')) {
				if (file.name.includes(month + '_' + day + '_' + year)) {
					document.getElementById('fileSelected2').innerText = `Selected file: ${file.name}`
					document.getElementById('fileSelected2').style.display = `block`
					document.getElementById('uploadFileBtn').style.display = `flex`
					document.getElementById('uploadFile').innerText = `Upload ${file.name}`
				}
				else {
					alert('Report date does not match with the date you selected previously.')
				}
			} else {
				alert('Please choose a Payment Summary Report for Be Fresh')
			}
		}

		if (bf && !oa) {
			if (file && file.name.includes('Payment_Summary_') && file.name.includes('Organic_Acres')) {
				if (file.name.includes(month + '_' + day + '_' + year)) {
					document.getElementById('fileSelected2').innerText = `Selected file: ${file.name}`
					document.getElementById('fileSelected2').style.display = `block`
					document.getElementById('uploadFileBtn').style.display = `flex`
					document.getElementById('uploadFile').innerText = `Upload ${file.name}`
				}
				else {
					alert('Report date does not match with the date you selected previously.')
				}
			} else {
				alert('Please choose a Payment Summary Report for Organic Acres')
			}
		}
	}

	function choosefile3(e) {
		file = e.target.files[0]
		if (!bf && !oa) {
			if (file && file.name.includes('Inventory_Log_') && file.name.includes(month + '_' + day + '_' + year)) {
				document.getElementById('fileSelected3').innerText = `Selected file: ${file.name}`
				document.getElementById('fileSelected3').style.display = `block`
				document.getElementById('uploadFileBtn2').style.display = `flex`
				document.getElementById('uploadFile2').innerText = `Upload ${file.name}`
			} else {
				alert('Please choose an Inventory Log Report')
			}
		}

		if (!bf && oa) {
			if (file && file.name.includes('Inventory_Log_') && file.name.includes(month + '_' + day + '_' + year) && file.name.includes('Be_Fresh')) {
				document.getElementById('fileSelected3').innerText = `Selected file: ${file.name}`
				document.getElementById('fileSelected3').style.display = `block`
				document.getElementById('uploadFileBtn2').style.display = `flex`
				document.getElementById('uploadFile2').innerText = `Upload ${file.name}`
			} else {
				alert('Please choose an Inventory Log Report for Be Fresh')
			}
		}

		if (bf && !oa) {
			if (file && file.name.includes('Inventory_Log_') && file.name.includes(month + '_' + day + '_' + year) && file.name.includes('Organic_Acres')) {
				document.getElementById('fileSelected3').innerText = `Selected file: ${file.name}`
				document.getElementById('fileSelected3').style.display = `block`
				document.getElementById('uploadFileBtn2').style.display = `flex`
				document.getElementById('uploadFile2').innerText = `Upload ${file.name}`
			} else {
				alert('Please choose an Inventory Log Report for Organic Acres')
			}
		}
	}

	function uploadPayment(e) {
		document.getElementById('uploadFileBtn').style.display = `none`
		document.getElementById('chooseDiv').style.display = `none`
		document.getElementById('datediv').style.display = `none`

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
					id_paymenttype = response.id
					document.getElementById('loadingText').style.display = `none`
					document.getElementById('chooseDiv').style.display = `block`
					document.getElementById('inventorylog').style.display = `block`
					document.getElementById('paymenttype').style.display = `block`
					document.getElementById('paymentupload').style.display = `none`
					document.getElementById('paymentuploadtxt').innerText = `${response.name} Uploaded to Cloud 􀁢`
				})
				.catch((e) => console.log(e))
		}
	}

	function uploadInventory(e) {
		document.getElementById('uploadFileBtn2').style.display = `none`
		document.getElementById('chooseDiv').style.display = `none`
		document.getElementById('datediv').style.display = `none`

		reader.readAsDataURL(file)
		reader.onload = function (e) {
			document.getElementById('loadingText').style.display = `block`
			var rawLog = reader.result.split(',')[1]
			var dataSend = {
				dataReq: { data: rawLog, name: file.name, type: file.type },
				fname: 'uploadFilesToGoogleDrive',
			}
			fetch(
				'https://script.google.com/macros/s/AKfycbw0dR0qBlv03k5b0Pv8GZlNTMm94XGpJfEL9jE4bLI8BToI_NrWoU9giC0RVNPbBSCJAw/exec', //your AppsScript URL
				{ method: 'POST', body: JSON.stringify(dataSend) }
			)
				.then((res) => res.json())
				.then((response) => {
					// console.log(response)
					id_inventorylog = response.id

					console.log(user.db)
					console.log(id_inventorylog)
					console.log(id_paymenttype)
					console.log(dateValue)

					userService.cleanCSV(user.db, id_inventorylog, id_paymenttype, year, month, day)
						.then((resp) => {
							console.log(resp)
							checkLog()
							document.getElementById('loadingText').style.display = `none`
							document.getElementById('chooseDiv').style.display = `block`
							document.getElementById('inventorylog').style.display = `block`
							document.getElementById('invetoryupload').style.display = `none`
							document.getElementById('invetoryuploadtxt').innerText = `${response.name} Uploaded to Cloud 􀁢`
							document.getElementById('doneText').style.display = `block`
							document.getElementById('uploadSuccess').style.display = `block`

						})
						.catch((err) => {
							console.log(err)
							document.getElementById('loadingText').style.display = `none`
							document.getElementById('doneText').style.display = `block`
							document.getElementById('uploadSuccess').style.display = `none`
							document.getElementById('uploadFail').style.display = `block`
						})
				})
				.catch((e) => console.log(e))
		}
	}

	function trainModels(e) {
		document.getElementById('loadingText').style.display = `block`

		userService.trainModels(JSON.parse(localStorage.getItem('user')).db.toString(), year.toString(), month.toString(), day.toString())
			.then((res) => {
				console.log(res)
				document.getElementById('loadingText').style.display = `none`
				document.getElementById('doneText').style.display = `block`
				document.getElementById('uploadSuccess').style.display = `none`
				document.getElementById('uploadFail').style.display = `none`
				document.getElementById('trainDone').style.display = `block`
			})
			.catch((e) => console.log(e))
	}

	return (
		<>
			<Navbar />
			<div style={{ paddingRight: '4rem', paddingLeft: '8rem', paddingTop: '2rem', paddingBottom: '2rem', height: '100vh' }} className={`dashboardTemplate`}>
				<div id='chooseDiv' style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }} className='text-center'>
					<div style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }} className='text-center'>
						<h1 style={{ padding: '1rem' }}>Train Model</h1>
						<h2 style={{ padding: '1rem' }} id='todo'>{todo}</h2>
					</div>

					<div style={{ padding: '1rem' }} id='datediv'>
						<h2 style={{ padding: '1rem' }}>When was the file you want to upload generated?</h2>
						<input
							type="date"
							max={new Date().toLocaleDateString('en-ca')}
							onChange={(e) => onChangeDate(e)}
							className='sel'
							style={{ border: '2px solid black', width: '50%' }}
						/>
					</div>

					{/* <div style={{ padding: '1rem', display: 'none' }} id='actionlog'>
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
					</div> */}

					<div style={{ padding: '1rem', display: 'none' }} id='paymenttype'>
						<h3 id='paymentuploadtxt'>Upload the Payment Summary Report</h3>
						<div className={`justify-content-between`} style={{ padding: '0.5rem', display: 'inline-flex' }} id='paymentupload'>
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
						<h3 id='invetoryuploadtxt'>Upload the Inventory Log Report</h3>
						<div id='invetoryupload' className={`justify-content-between`} style={{ padding: '0.5rem', display: 'inline-flex' }}>
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

				<div className={`justify-content-between`} style={{ padding: '0.5rem', display: 'none' }} id='uploadFileBtn' >
					<button className={`btn bttn`} onClick={(e) => uploadPayment(e)}>
						<label htmlFor="uploadFile" id='uploadFile' style={{ width: '50%', cursor: 'pointer' }}>
							Upload Payment Type Report
						</label>
					</button>
				</div>

				<div className={`justify-content-between`} style={{ padding: '0.5rem', display: 'none' }} id='uploadFileBtn2' >
					<button className={`btn bttn`} onClick={(e) => uploadInventory(e)}>
						<label htmlFor="uploadFile" id='uploadFile2' style={{ width: '50%', cursor: 'pointer' }}>
							Upload Payment Type Report
						</label>
					</button>
				</div>

				<div style={{ display: 'none', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: '8rem' }} className='text-center' id='loadingText'>
					<h1 style={{ fontSize: '800%' }}>􀌗</h1>
					<h2 style={{ padding: '1rem' }}>Please stay on this page and do not refresh the page.</h2>
					<h2 style={{ padding: '1rem' }}>Your CSV file is being uploaded to the cloud...</h2>
				</div>

				<div style={{ display: 'none', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: '2rem' }} className='text-center' id='doneText'>
					<div id='uploadSuccess'>
						<h1 style={{ fontSize: '500%' }}>􀢓</h1>
						<h2 style={{ padding: '1rem' }}>Your files has been uploaded to the cloud</h2>
					</div>

					<div id='uploadFail' style={{ display: 'none' }}>
						<h1 style={{ fontSize: '500%' }}>􀌓</h1>
						<h2 style={{ padding: '1rem' }}>Failed uploading to cloud. Please try again.</h2>
					</div>

					<div id='trainDone' style={{ display: 'none' }}>
						<h1 style={{ fontSize: '500%' }}>􀢓</h1>
						<h2 style={{ padding: '1rem' }}>Models have been trained.</h2>
					</div>

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

						<button className={`btn bttn`} onClick={(e) => window.location.reload()} id='uploadAnotherBtn' style={{ display: 'block' }}>
							<label htmlFor="uploadFile" id='uploadFileAgain' style={{ width: '100%', cursor: 'pointer' }}>
								Upload Another File
							</label>
						</button>

						<button className={`btn bttn`} onClick={(e) => trainModels(e)} id='trainBtn' style={{ display: 'none' }}>
							<label htmlFor="trainModels" id='trainModelsLabel' style={{ width: '100%', cursor: 'pointer' }}>
								Train Models
							</label>
						</button>
					</div>
				</div>

			</div>
		</>
	);
}