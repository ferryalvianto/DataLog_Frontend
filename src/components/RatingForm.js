import React, { useState } from 'react';
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

const RatingForm = () => {
	const navigate = useNavigate()
	const [value, setValue] = useState(5);
	const StyledRating = styled(Rating)(({ theme }) => ({
		'& .MuiRating-iconEmpty .MuiSvgIcon-root': {
			color: theme.palette.action.disabled,
		},
	}));
	const [location, setLocation] = useState('Be Fresh–Cypress')

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
	return (
		<div style={{ height: '95vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
			<div className='patternDiv'></div>
			<div className='card' id='cardBackground' style={{ width: '90vw', display: 'flex',  alignItems: 'center' , cursor:'pointer' }} onClick={(e) => { 
				// window.open('https://www.befresh.ca/', '_blank') 
				}}>
				<img src={"https://www.befresh.ca/wrdp/wp-content/uploads/2017/12/BeFresh_Web_LogoArtboard-1@2x.png"} style={{height:'auto', width:'40%', filter:'invert(1)'}} />
			</div>
			<div className='card' id='cardBackground' style={{ width: '90vw' }}>
				<Form>
					<Form.Group controlId="exampleForm.ControlTextarea1" className='text-start'>
						<h2 style={{ margin: '1rem' }}>How was your experience at our store?</h2>
						<StyledRating
							name="rating"
							value={value}
							onChange={(event, newValue) => {
								setValue(newValue);
							}}
							IconContainerComponent={IconContainer}
							getLabelText={(value) => customIcons[value].label}
							highlightSelectedOnly
							style={{ margin: '1rem' }}
						/>
						<div style={{ display: 'flex', margin: '1rem', alignItems: 'center' }}>
							<h2 style={{ width: '50%' }}>Select location:</h2>
							<div style={{ width: '50%' }}>
								<select className='sel' onChange={(e) => { setLocation(e.target.value) }}>
									<option name="CY">Be Fresh–Cypress</option>
									<option name="OA">Organic Acres–Main St.</option>
								</select>
							</div>
						</div>
						<Form.Control
							as="textarea"
							name="comment"
							rows={5}
							placeholder="Enter your feedback here 􀌲"
							value={textArea}
							onChange={handleChange}
							style={{ padding: '1rem' }}
						/>
					</Form.Group>
					<div style={{ margin: '1rem' }}></div>
					<Button variant="primary" type="submit" className={`btn bttn`}>
						Submit
					</Button>
				</Form>
			</div>
			<div style={{ margin: '1rem', cursor: 'pointer' }} onClick={(e) => { window.open('/', '_blank') }}>
				<h5>Analysis by DataLog</h5 >
			</div>
		</div>
	);
};

export default RatingForm;
