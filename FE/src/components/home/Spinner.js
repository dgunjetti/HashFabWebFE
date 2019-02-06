import React from 'react'
import { ClipLoader } from 'react-spinners';
import './Spinner.css'

const Spinner = () => {
	return(
		<div className="dark-overlay">
	    <div className="spinner">
	      <ClipLoader
	        size={55}
	        color={'#000'} 
	        loading={true} 
	      />
	    </div>
	  </div>
	);
};

export default Spinner;