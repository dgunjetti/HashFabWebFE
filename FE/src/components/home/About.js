import React, { Component } from 'react'
import Footer from './Footer'

class About extends Component {
	componentDidMount() {
	  window.scrollTo(0, 0)
	}

	render() {
		return(
			<div className="d-flex flex-column justify-content-between">
				<div className="container mt-5">
					<div className="row justify-content-md-center">
						<div className="col-md-8">
							<h5>ABOUT US</h5>
							<hr/>
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ut metus egestas, efficitur lectus sit amet, tempus purus. Pellentesque porttitor ex id quam porta accumsan. Vivamus tristique facilisis ultricies. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris porttitor arcu sit amet ante dapibus venenatis. Mauris dictum in erat eget venenatis. Mauris porttitor ultricies posuere. Donec lobortis sed risus eget viverra. In finibus nisi id odio venenatis interdum. Sed sodales commodo libero eget feugiat. Ut blandit, nibh fringilla facilisis imperdiet, eros mi maximus ante, vel mattis ligula elit id quam. Nulla neque elit, semper nec erat at, consectetur suscipit ex. Nunc fermentum sapien lacus, at pellentesque augue luctus a. In massa nisi, commodo quis blandit non, blandit sit amet erat.
							</p>
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ut metus egestas, efficitur lectus sit amet, tempus purus. Pellentesque porttitor ex id quam porta accumsan. Vivamus tristique facilisis ultricies. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris porttitor arcu sit amet ante dapibus venenatis. Mauris dictum in erat eget venenatis. Mauris porttitor ultricies posuere. Donec lobortis sed risus eget viverra. In finibus nisi id odio venenatis interdum. Sed sodales commodo libero eget feugiat. Ut blandit, nibh fringilla facilisis imperdiet, eros mi maximus ante, vel mattis ligula elit id quam. Nulla neque elit, semper nec erat at, consectetur suscipit ex. Nunc fermentum sapien lacus, at pellentesque augue luctus a. In massa nisi, commodo quis blandit non, blandit sit amet erat.
							</p>
						</div>
					</div>
				</div>
				<Footer />
			</div>
		);
	}
};

export default About;