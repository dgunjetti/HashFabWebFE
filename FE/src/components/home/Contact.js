import React, { Component } from 'react'
import Footer from './Footer'

class Contact extends Component {
	componentDidMount() {
	  window.scrollTo(0, 0)
	}
	handleSubmit = () => {

	}
	render () {
		return(
			<div className="d-flex flex-column justify-content-between">
				<div className="container mt-5">
					<div className="row justify-content-md-center">
						<div className="col-md-8">
							<h5>CONTACT US</h5>
							<hr/>
		          <form>
		            <div className="form-group">
		              <div className="input-group input-group-lg">
		                <span className="input-group-addon"><i className="fa fa-user"></i></span>
		                <input type="text" className="form-control" placeholder="Name" />
		              </div>
		            </div>
		            <div className="form-group">
		              <div className="input-group input-group-lg">
		                <span className="input-group-addon"><i className="fa fa-envelope"></i></span>
		                <input type="email" className="form-control" placeholder="Email" />
		              </div>
		            </div>
		            <div className="form-group">
		              <div className="input-group input-group-lg">
		                <span className="input-group-addon"><i className="fa fa-pencil"></i></span>
		                <textarea className="form-control" placeholder="Message" rows="5"></textarea>
		              </div>
		            </div>
		            <input type="submit" value="SUBMIT" className="btn btn-app-primary btn-block btn-lg"/>
		          </form>
						</div>
					</div>
				</div>
				<Footer />
			</div>
		);
	}
};

export default Contact;