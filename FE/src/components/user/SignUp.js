import React, { Component } from 'react'
import './SignUp.css'
import { Link } from 'react-router-dom'
import onAuth from '../../store/actions/auth'
import { connect } from 'react-redux'
import setAppState 
        from '../../store/actions/appState'
import Spinner from '../home/Spinner';

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

class SignUp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			name: "",
			password: "",
      validationError: "",
      loading: false,
		}
	}

	handleSubmit = e => {
		e.preventDefault();
    
    if (!validateEmail(this.state.email)) {
      this.setState({validationError: "Invalid Email"});
    } else {
      this.setState({loading: true});
      this.props.onAuth("register", this.state).then(() => {
        this.setState({loading: false});
      	if (this.props.appState && this.props.appState.state === 'checkout') {
          this.props.setAppState(" ");
          this.props.history.push("/checkout/billing-address");
        } else {
          this.props.history.push('/shop')
        }
      }).catch(err => {
      	console.log("signup failed");
        this.setState({loading: false});
      });
    }
	}

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	renderCard = (errors) => {
		return (
        <div className="card">
          <div className="card-header">
            <h5>Create Account</h5>
          </div>
          <div className="card-body">
            {this.state.validationError !== "" && (
              <div className="alert alert-danger text-center">
                {this.state.validationError}
              </div>
            )}
            {errors && errors.message && (
                  <div className="alert alert-danger text-center">{errors.message}</div>
            )}
          	<form onSubmit={this.handleSubmit}>
        			<div className="form-group">
								<label className="sr-only" htmlFor="name">Your Name</label>
								<input id="name" maxLength="50" type="text" name="name" 
				  			className="form-control" onChange={this.handleChange} 
				  			placeholder="Enter Your Name" required />
				  		</div>

			  			<div className="form-group">
  							<label className="sr-only" htmlFor="email">Email address</label>
  							<input id="email" type="email" name="email" 
  							className="form-control" onChange={this.handleChange} 
  							placeholder="E-mail" required/>	
  						</div>

							<div className="form-group">
  							<label className="sr-only" htmlFor="password">Password</label>
  							<input id="password" type="password" name="password" 
  							className="form-control" onChange={this.handleChange} 
  							placeholder="Create Password" 
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
                title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                required />
							</div>
							<button type="submit" 
                className="btn btn-app-primary btn-block btn-lg">
                SUBMIT
              </button>
          	</form>
          </div>
          <div className="card-footer text-center">
 	        	Already have an account?
            &nbsp;&nbsp;
            <Link to="/login"><strong>LOGIN</strong></Link>
 	        </div>
        </div>  
 		);
	}


	render() {
    const { errors, history, removeError } = this.props;

    history.listen(() => {
      this.props.removeError();
    }); 
    
		console.log("signup");
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

export default connect(mapStateToProps, { onAuth, setAppState })(SignUp);


