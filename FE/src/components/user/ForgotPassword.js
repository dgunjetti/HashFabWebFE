import React, { Component } from 'react'
import { connect } from 'react-redux'
import { onAuthChange } from '../../store/actions/auth'

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

class ForgotPassword extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			validationError: "",
		}
	}

	handleSubmit = (e) => {
		e.preventDefault();
		
		if (!validateEmail(this.state.email)) {
			this.setState({validationError: "Invalid Email"});
		} else {
			this.setState({validationError: ""});
			this.setState({loading: true});
	    this.props.onAuthChange("forgot-password", {email: this.state.email}).then(() => {
	    	this.setState({loading: false});
	    	if (this.props.appState && this.props.appState.state === 'checkout') {
	    		this.props.setAppState(" ");
		    	this.props.history.push("/checkout/shoppingcart");
		    } else {
		    	this.props.history.push('/shop')
		    }
	    }).catch(err => {
	    	console.log(err);
	    	this.setState({loading: false});
	    });
	  }
	}

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	}
	render () {
		return(
			<div className="container mt-5">
				<div className="row justify-content-md-center">
					<div className="col-md-4">
						<div className="card">
						<div className="card-header">
							<h6>FORGOT PASSWORD</h6>
						</div>
						<div className="card-body">
						  <form onSubmit={this.handleSubmit}>
						  	{this.state.validationError !== "" && (
									<div className="alert alert-danger text-center">
										{this.state.validationError}
									</div>
								)}
								<div className="form-group">
									<label htmlFor="email" className="sr-only">Email</label>
									<input id="email" type="email" 
										className="form-control" 
										placeholder="Email"
										onChange={this.handleChange} name="email" required/>
								</div>
								<input type="submit" 
									className="btn btn-lg btn-block btn-app-primary" 
									value="RESET PASSWORD"/>
							</form>
						</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
};

export default connect(null, { onAuthChange })(ForgotPassword);

