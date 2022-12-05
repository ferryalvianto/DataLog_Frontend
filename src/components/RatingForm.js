import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { display } from '@mui/system';
import { useNavigate } from 'react-router';
import axios from 'axios';

const RatingForm = () => {
	const API_URL = 'https://datalogwebapp.herokuapp.com/datalog/api/'
	// const API_URL = 'http://127.0.0.1:8000/datalog/api/';

	const navigate = useNavigate();
	const [isMobile, setMobile] = useState(false);
	const [value, setValue] = useState(5);
	const StyledRating = styled(Rating)(({ theme }) => ({
		'& .MuiRating-iconEmpty .MuiSvgIcon-root': {
			color: theme.palette.action.disabled,
		},
	}));
	const [location, setLocation] = useState('Be Fresh–Cypress');

	const customIcons = {
		1: {
			icon: <SentimentVeryDissatisfiedIcon color="error" />,
			label: 'Very Dissatisfied',
		},
		2: {
			icon: <SentimentDissatisfiedIcon color="error" />,
			label: 'Dissatisfied',
		},
		3: {
			icon: <SentimentSatisfiedIcon color="warning" />,
			label: 'Neutral',
		},
		4: {
			icon: <SentimentSatisfiedAltIcon color="success" />,
			label: 'Satisfied',
		},
		5: {
			icon: <SentimentVerySatisfiedIcon color="success" />,
			label: 'Very Satisfied',
		},
	};

	function IconContainer(props) {
		const { value, ...other } = props;
		return <span {...other}>{customIcons[value].icon}</span>;
	}

	IconContainer.propTypes = {
		value: PropTypes.number.isRequired,
	};

	const [textArea, setTextArea] = useState('');
	const handleChange = (event) => {
		setTextArea(event.target.value);
	};

	useEffect(() => {
		if (
			navigator.userAgent.match(
				/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i
			)
		) {
			setMobile(true);
			document.getElementById('formdiv').style.height = 'auto';
		} else {
			setMobile(false);
			document.getElementById('formdiv').style.height = '95vh';
		}
	}, []);

	return (
		<>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					flexDirection: 'column',
				}}
				id="formdiv"
			>
				<div className="patternDiv"></div>

				{isMobile ? (
					<div
						className="card"
						id="cardBackground"
						style={{
							width: '100vw',
							display: 'flex',
							alignItems: 'center',
							cursor: 'pointer',
						}}
						onClick={(e) => {
							// window.open('https://www.befresh.ca/', '_blank')
						}}
					>
						<img
							src={
								'https://www.befresh.ca/wrdp/wp-content/uploads/2017/12/BeFresh_Web_LogoArtboard-1@2x.png'
							}
							style={{ height: 'auto', width: '100%', filter: 'invert(1)' }}
						/>
					</div>
				) : (
					<div
						className="card"
						id="cardBackground"
						style={{
							width: '90vw',
							display: 'flex',
							alignItems: 'center',
							cursor: 'pointer',
						}}
						onClick={(e) => {
							// window.open('https://www.befresh.ca/', '_blank')
						}}
					>
						<img
							src={
								'https://www.befresh.ca/wrdp/wp-content/uploads/2017/12/BeFresh_Web_LogoArtboard-1@2x.png'
							}
							style={{ height: 'auto', width: '40%', filter: 'invert(1)' }}
						/>
					</div>
				)}

				<div
					className="card"
					id="cardBackground"
					style={{ width: '100vw', padding: '2rem' }}
				>
					<Form>
						{/* <Form.Group */}
							{/* controlId="exampleForm.ControlTextarea1"
							className="text-start"
						> */}
							{isMobile ? (
								<>
									<h2 style={{ marginTop: '1rem', marginBottom: '1rem' }}>
										How was your experience at our store?
									</h2>
									<div
										style={{
											marginTop: '1rem',
											marginBottom: '1rem',
											width: '90vw',
											display: 'flex',
											alignItems: 'center',
										}}
									>
										<StyledRating
											name="rating"
											value={value}
											onChange={(event, newValue) => {
												setValue(newValue);
											}}
											IconContainerComponent={IconContainer}
											getLabelText={(value) => customIcons[value].label}
											highlightSelectedOnly
										/>
									</div>
								</>
							) : (
								<>
									<div
										style={{
											display: 'flex',
											marginTop: '1rem',
											marginBottom: '1rem',
											alignItems: 'center',
										}}
									>
										<h2
											style={{
												marginTop: '1rem',
												marginBottom: '1rem',
												width: '50%',
											}}
										>
											How was your experience at our store?
										</h2>
										<StyledRating
											name="rating"
											value={value}
											onChange={(event, newValue) => {
												setValue(newValue);
											}}
											IconContainerComponent={IconContainer}
											getLabelText={(value) => customIcons[value].label}
											highlightSelectedOnly
											style={{
												marginTop: '1rem',
												marginBottom: '1rem',
												width: '50%',
											}}
										/>
									</div>
								</>
							)}

							{isMobile ? (
								<>
									<h2 style={{ marginTop: '1rem', marginBottom: '1rem' }}>
										Select location:
									</h2>
									{/* <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
									<select className='sel' onChange={(e) => { setLocation(e.target.value) }}>
										<option name="CY">Be Fresh–Cypress</option>
										<option name="OA">Organic Acres–Main St.</option>
									</select>
								</div> */}
								</>
							) : (
								<>
									<div
										style={{
											display: 'flex',
											marginTop: '1rem',
											marginBottom: '1rem',
											alignItems: 'center',
										}}
									>
										<h2 style={{ width: '50%' }}>Select location:</h2>
										{/* <div style={{ width: '50%' }}>
										<select className='sel' onChange={(e) => { setLocation(e.target.value) }}>
											<option name="CY">Be Fresh–Cypress</option>
											<option name="OA">Organic Acres–Main St.</option>
										</select>
									</div> */}
									</div>
								</>
							)}
							<Form.Control
								as="textarea"
								name="comment"
								rows={8}
								placeholder="Enter your feedback here 􀌲"
								value={textArea}
								onChange={handleChange}
								style={{
									padding: '1rem',
									marginTop: '1rem',
									marginBottom: '1rem',
								}}
							/>
						{/* </Form.Group> */}
						<div style={{ marginTop: '1rem', marginBottom: '1rem' }}></div>
						<div
							onClick={(e) => {
								// 	// e.preventDefault();
								console.log('clicked');
								axios
									.get(
										'https://datalogwebapp.herokuapp.com/datalog/api/' +
											'insert_sentiments/?db=' +
											JSON.parse(localStorage.getItem('user')).db.toString() +
											'&rating=' +
											value +
											'&comment=' +
											textArea
									)
									.then((res) => {});
							}}
						>
							<Button variant="primary" className={`btn bttn`}>
								Submit
							</Button>
						</div>
					</Form>
				</div>
				<div
					style={{ marginTop: '1rem', marginBottom: '1rem', cursor: 'pointer' }}
					onClick={(e) => {
						window.open('/', '_blank');
					}}
				>
					<h5>Analysis by DataLog</h5>
				</div>
			</div>
		</>
	);
};

export default RatingForm;
