import React, { Component } from 'react'
import './SignUp.css'

class Address extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			address: "",
			city: "",
			state: "",
			pincode: ""
		}
		this.handleSubmit = this.handleSubmit.bind(this);
	}

 	handleSubmit = e => {
 		debugger;
		e.preventDefault();
    this.props.addAddress(
    	this.props.currentUser.user.id,
    	this.state)
    .then(() => {
    	if (this.props.products === undefined) {
    		this.props.history.push("/");
    	} else {
    		if (this.props.products.length  > 0) {
      		this.props.history.push("/buy/payselect");
      	} else {
      		this.props.history.push("/");
      	}
      }
    }).catch(err => {
    	console.log(err);
    });
	}

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	render() {
		const { name, address, city, state, pincode } = this.state;
		const { errors } = this.props;
		return (
			<div>
				<div className="row justify-content-md-center">
					<div className="col-md-6">
						<div>
							<form onSubmit={this.handleSubmit}>
								<h2 className="title text-center">ADD DELIVERY ADDRESS</h2>
								
								{errors.message && (
									<div className="alert alert-danger text-center">{errors.message}</div>
								)}
								
								<div className="form-group">
									<label htmlFor="name">Name</label>
									<input id="name" maxLength="50" type="text" name="name" 
					  			className="form-control" onChange={this.handleChange} 
					  			placeholder="Enter Name" value={name} required />
					  		</div>

								<div className="form-group">
	  							<label htmlFor="address">Address</label>
	  							<textarea id="address" rows="2" name="address" 
	  							className="form-control" onChange={this.handleChange} 
	  							placeholder="Address" value={address} required />
	  						</div>
	  						<div className="form-group">
	  							<label htmlFor="address">City</label>
	  							<input id="city" type="text" name="city" 
	  							className="form-control" onChange={this.handleChange} 
	  							placeholder="City" value={city} required />
	  						</div>
	  						<div className="form-group">
	  							<label htmlFor="address">State</label>
	  							<input id="state" type="text" name="state" 
	  							className="form-control" onChange={this.handleChange} 
	  							placeholder="State" value={state} required />
	  						</div>
	  						<div className="form-group">
	  							<label htmlFor="address">Pin Code</label>
	  							<input id="pincode" type="text" name="pincode" 
	  							className="form-control" onChange={this.handleChange} 
	  							placeholder="Pin Code" value={pincode} required />
								</div>	  						

	  						<div className="spacing-bottom">
	  							<button type="submit" className="btn btn-primary btn-block btn-lg">Submit</button>
	  						</div>

							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Address;



