import React from 'react'
import './HrWithText.css'

const HrWithText = ({text}) => {
	return(
		<div className="category">
			<span>{text}</span>
		</div>
	);
};

export default HrWithText;