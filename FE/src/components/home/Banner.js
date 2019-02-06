import React from 'react'
import './Banner.css'
import { Link } from 'react-router-dom'
import Media from "react-media"

const Banner = ({ banner }) => {
	const imageDesktop = {
    backgroundImage: `url(${banner.imgDesktop})`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
    backgroundColor: "#464646",
    minHeight: "60vh",
	}

  const imageMobile = {
    backgroundImage: `url(${banner.imgMobile})`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
    backgroundColor: "#464646",
    minHeight: "60vh",
  }

	return (
    <div>  
      <Media query="(max-width: 767px)">
      {matches =>
        matches ? (
          <div className="jumbotron img-fluids" style={imageMobile}></div> 
        ) : (
          <div className="jumbotron img-fluids" style={imageDesktop}></div>
        )
      }
    </Media>
  </div>
	);
}

export default Banner;

/*
const Desktop = props => <Responsive {...props} minWidth={992} />;
const Tablet = props => <Responsive {...props} minWidth={768} maxWidth={991} />;
const Mobile = props => <Responsive {...props} maxWidth={767} />;
const Default = props => <Responsive {...props} minWidth={768} />;
*/