import React, { Component } from 'react'
import { connect } from 'react-redux'
import { onAuthChange, onChangePassword } from '../../store/actions/auth'


class ResetPassword extends Component {
	constructor(props) {
		super(props);
		this.state = {
			password: "",
			confirmPassword: "",
			validationError: ""
		}
	}

	handleSubmit = (e) => {
		e.preventDefault();
		if (this.state.confirmPassword.localeCompare( this.state.password ) !== 0) {
			this.setState({validationError: "Confirm Password does not match Password"});
			return;
		}
		this.setState({validationError: ""});

		if (this.props.mode === "reset-password") {
			var data = {
				password: this.state.password,
	    	token: this.props.match.params.token
	    };

			this.setState({loading: true});
	    this.props.onAuthChange("reset-password", 
	    		data)
	    .then(() => {
	    	this.setState({loading: false});
		    this.props.history.push('/myprofile')
	    }).catch(err => {
	    	console.log(err);
	    	this.setState({loading: false});
	    });
		} else {

			this.setState({loading: true});
	    this.props.onChangePassword(
    		this.props.currentUser.user.id,
    		{password: this.state.password }
	    )
	    .then(() => {
	    	this.setState({loading: false});
		    this.props.history.push('/myprofile')
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
		console.log(this.props.match.params.token);
		return(
			<div className="container mt-5">
				<div className="row justify-content-md-center">
					<div className="col-md-4">
						<div className="card">
						<div className="card-header">
							<h6>RESET PASSWORD</h6>
						</div>
						<div className="card-body">
						  <form onSubmit={this.handleSubmit}>
						  	{this.state.validationError !== "" && (
									<div className="alert alert-danger text-center">
										{this.state.validationError}
									</div>
								)}
								<div className="form-group">
	  							<label className="sr-only" htmlFor="password">Password</label>
	  							<input id="password" type="password" name="password" 
	  							className="form-control" onChange={this.handleChange} 
	  							placeholder="Password" 
	                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
	                title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
	                required />
								</div>
								<div className="form-group">
	  							<label className="sr-only" htmlFor="confirmPassword">Confirm Password</label>
	  							<input id="confirmPassword" type="password" name="confirmPassword" 
	  							className="form-control" onChange={this.handleChange} 
	  							placeholder="Confirm Password" 
	                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
	                title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
	                required />
								</div>
								<input type="submit" 
									className="btn btn-lg btn-block btn-app-primary" 
									value="UPDATE PASSWORD"/>
							</form>
						</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
};

export default connect(null, { onAuthChange, onChangePassword })(ResetPassword);

