import React, { Component } from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'
import FooterCopyright from './FooterCopyright'

class Footer extends Component {
	handleSubmit = () => {

	}
	render () {
		return(
			<footer id="main-footer" className="text-white mt-5">
				<section id="about-section" className="py-3">
					<div className="container">
						<div className="row">
							<div className="col-md-3 d-flex flex-column footer-section">
								<Link to="/blogs">BLOGS</Link>
								<Link to="/about">ABOUT US</Link>
								<Link to="/contact">CONTACT</Link>	
							</div>
							<div className="col-md-3 d-flex flex-column  footer-section">			
								<Link to="/shipping">SHIPPING AND RETURNS</Link>
								<Link to="/payment">PAYMENT</Link>
								<Link to="/terms">TERMS</Link>
							</div>
							<div className="col-md-6 d-flex flex-column">

								<form onSubmit={this.handleSubmit}>
									<h6>SUBSCRIBE FOR NEWSLETTER</h6>
									<div className="form-group">
			              <input type="email" 
			              	className="form-control newsletter-input w-50" 
			              	placeholder="Email Address" />
			            </div>
			            <input type="submit" value="SUBSCRIBE" className="btn btn-app-primary" />
								</form>

							</div>
						</div>
					</div>
				</section>
				<FooterCopyright />
			</footer>
		);
	}
};

export default Footer;