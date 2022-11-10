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

const RatingForm = () => {
	const [value, setValue] = useState(5);
	const StyledRating = styled(Rating)(({ theme }) => ({
		'& .MuiRating-iconEmpty .MuiSvgIcon-root': {
			color: theme.palette.action.disabled,
		},
	}));

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
		<>
			<Form>
				<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
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
					<br />
					<Form.Control
						as="textarea"
						name="comment"
						rows={3}
						placeholder="comment"
						value={textArea}
						onChange={handleChange}
					/>
				</Form.Group>
				<Button variant="primary" type="submit">
					Submit
				</Button>
			</Form>
			<br />
		</>
	);
};

export default RatingForm;
