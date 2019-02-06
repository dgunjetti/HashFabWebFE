import React, { Component } from 'react'
import Footer from './Footer'

class Blogs extends Component {
	componentDidMount() {
	  window.scrollTo(0, 0)
	}

	render() {
		return(
			<div className="d-flex flex-column justify-content-between">
				<div className="container mt-5">
					<div className="row justify-content-md-center">
						<div className="col-md-8">
							<h5>BLOGS</h5>
							<hr/>

						</div>
					</div>
				</div>
			</div>
		);
	}
};

export default Blogs;