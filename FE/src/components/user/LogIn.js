import React, { Component } from 'react'
import './SignUp.css'
import { Link } from 'react-router-dom'
import FacebookLogin from 'react-facebook-login'
import GoogleLogin from 'react-google-login'
import config from '../../config'
import FontAwesome from 'react-fontawesome'
import './Login.css'
import onAuth from '../../store/actions/auth'
import { connect } from 'react-redux'
import setAppState 
				from '../../store/actions/appState'
import { addError } from '../../store/actions/errors'
import Spinner from '../home/Spinner';

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}


class LogIn extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			isAuthenticated: false,
			token: "",
			validationError: "",
			loading: false
		}
	}

	handleSubmit = e => {
		e.preventDefault();
		
		if (!validateEmail(this.state.email)) {
			this.setState({validationError: "Invalid Email"});
		} else {
			this.setState({validationError: ""});
			this.setState({loading: true});
	    this.props.onAuth("login", this.state).then(() => {
	    	this.setState({loading: false});
	    	if (this.props.appState && this.props.appState.state === 'checkout') {
	    		this.props.setAppState(" ");
		    	this.props.history.push("/checkout/billing-address");
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

	responseFacebook = (response) => {
		console.log(response);
		const token = {
			access_token: response.accessToken
		}
		console.log(token);
		this.setState({loading: true});
		this.props.onAuth("facebook", token).then(() => {
			this.setState({loading: false});
			if (this.props.appState && this.props.appState.state === 'checkout') {
				this.props.setAppState(" ");
	    	this.props.history.push("/checkout/billing-address");
	    } else {
	    	this.props.history.push('/shop')
	    }
    }).catch(err => {
    	console.log(err);
    	this.setState({loading: false});
    });
	}


  responseGoogle = (response) => {
  	console.log(response);
    console.log(response.tokenObj.access_token);
    const token = {
			access_token: response.tokenObj.access_token
		}
		this.setState({loading: true}); 
    this.props.onAuth("google", token).then(() => {
    	this.setState({loading: false});
	    if (this.props.appState && this.props.appState.state === 'checkout') { 
	    	this.props.setAppState(" ");
	    	this.props.history.push("/checkout/billing-address");
	    } else {
	    	this.props.history.push('/shop')
	    }
    }).catch(err => {
    	this.setState({loading: false});
    	console.log(err);
    });
  }

	renderCard = (errors) => {
		return (
				<div className="card">
					<div className="card-header">
						<h5>LOGIN</h5>
					</div>
          <div className="card-body">
          	<div></div>
      	    <div className="d-flex flex-column text-center">
      	    	{errors && errors.message && (
									<div className="alert alert-danger text-center">{errors.message}</div>
								)}
					  	<FacebookLogin
						    appId={config.facebookAuth.clientID}
						    autoLoad={false}
						    fields="name,email,picture"
						    callback={this.responseFacebook} 
								cssClass="my-facebook-button-class"
								icon="fa-facebook"
								textButton="LOGIN WITH FACEBOOK"
								redirectUri={config.facebookAuth.callbackURL}
						    /> 
						   	<div className="mb-3"></div>
					    <GoogleLogin
						    clientId={config.googleAuth.clientID}
						    onSuccess={this.responseGoogle}
						    onFailure={this.responseGoogle}
						    className="my-google-button-class"
						  	>
						  	<svg aria-hidden="true" className="svg-icon native iconGoogle mr-2 align-self-center" width="18" height="18" 
						  		viewBox="0 0 18 18">
						  		<g><path d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18z" fill="#4285F4"/>
						  		<path d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 0 1-7.18-2.54H1.83v2.07A8 8 0 0 0 8.98 17z" fill="#34A853"/>
						  		<path d="M4.5 10.52a4.8 4.8 0 0 1 0-3.04V5.41H1.83a8 8 0 0 0 0 7.18l2.67-2.07z" fill="#FBBC05"/>
						  		<path d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 1.83 5.4L4.5 7.49a4.77 4.77 0 0 1 4.48-3.3z" fill="#EA4335"/>
						  		</g>
						  	</svg>
								<span>LOGIN WITH GOOGLE</span>
								</GoogleLogin>
								<div className="mb-4"></div>
						</div>
				    {this.state.validationError !== "" && (
							<div className="alert alert-danger text-center">
								{this.state.validationError}
							</div>
						)}
          	<form onSubmit={this.handleSubmit}>
							<div className="form-group">
								<label htmlFor="email" className="sr-only">Email</label>
								<input id="email" type="email" 
									className="form-control" 
									placeholder="Email"
									onChange={this.handleChange} name="email" required/>
							</div>
							<div className="form-group">
								<label htmlFor="password" className="sr-only">Password</label>
								<input id="password" type="password" 
									className="form-control" 
									placeholder="Password"
									onChange={this.handleChange} name="password" required/>
								<Link to="/forgot-password"
									style={{
										textDecoration: "none",
										fontSize: "0.8em"
									}}>
									FORGOT PASSWORD ?</Link>
							</div>
							<input type="submit" 
								className="btn btn-lg btn-block btn-app-primary" 
								value="LOGIN"/>
						</form>
          </div>
          <div className="card-footer text-center">
 	        	Don't have an account? 
 	        	&nbsp; &nbsp; 
 	        	<Link to="/signup"><strong> SIGN UP </strong></Link>
 	        </div>
        </div>
 		);
	}

	render() {
		const { errors, history, removeError } = this.props;

		history.listen(() => {
			this.props.removeError();
		}); 

		return (
			<div className="container mt-5">
				{this.state.loading && (
					<Spinner />
				)}
				<div className="row justify-content-md-center">
					<div className="col-md-6">
						{this.renderCard(errors)}
					</div>
				</div>
			</div>
		);
	}
}
function mapStateToProps(state) {
	return {
		appState: state.appState,
	};
}

export default connect(mapStateToProps, { onAuth, setAppState, addError })(LogIn);

/*
	Design:
	
*/

