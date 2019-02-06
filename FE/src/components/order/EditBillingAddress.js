import React, { Component } from 'react'
import '../user/SignUp.css'
import Modal from 'react-modal';
import { addBillingAddress } from '../../store/actions/shoppingCart'
import { connect } from 'react-redux'
import Spinner from '../home/Spinner'

class EditBillingAddress extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
      mobile: "",
			address: "",
			city: "",
			state: "",
			pincode: "",
      loading: false
		}
	}

  componentDidMount() {
    window.scrollTo(0, 0)
  }

 	handleSubmit = e => {
		e.preventDefault();
    let addr = {
      name: this.state.name,
      mobile: this.state.mobile,
      address: this.state.address,
      city: this.state.city,
      state: this.state.state,
      pincode: this.state.pincode,
    };
    this.setState({loading: true});
    this.props.addBillingAddress(
    	this.props.currentUser.user.id,
    	addr)
    .then(() => {
      this.setState({loading: false});
    	this.props.history.push('/myProfile');
    }).catch(err => {
    	console.log(err);
      this.setState({loading: false});
    });
	}


	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	render() {
		const { name, address, city, state, pincode, mobile } = this.state;

		return (
      <div className="container">
        {this.state.loading && (
          <Spinner />
        )}
        <div className="row justify-content-md-center mt-5">
          <div className="col-md-6">
            <h5>ADD BILLING ADDRESS </h5>
            <form onSubmit={this.handleSubmit}>
              
              <div className="form-group">
                <label htmlFor="name">Full Name:</label>
                <input id="name" maxLength="50" type="text" name="name" 
                className="form-control" onChange={this.handleChange} 
                 value={name} required />
              </div>

              <div className="form-group">
                <label htmlFor="mobile">Mobile Number:</label>
                <input id="text" type="tel" name="mobile" 
                className="form-control" onChange={this.handleChange} 
                pattern="^((\+*)((0[ -]+)*|(91 )*)(\d{12}|\d{10}))|\d{5}([- ]*)\d{6}$"
                value={mobile} required />
              </div>

              <div className="form-group">
                <label htmlFor="address">Address:</label>
                <textarea id="address" rows="2" name="address" 
                className="form-control" onChange={this.handleChange} 
                value={address} required />
              </div>
              <div className="form-group">
                <label htmlFor="city">Town/City:</label>
                <input id="city" type="text" name="city" 
                className="form-control" onChange={this.handleChange} 
                value={city} required />
              </div>
              <div className="form-group">
                <label htmlFor="city">State:</label>
                <input id="state" type="text" name="state" 
                className="form-control" onChange={this.handleChange} 
                value={state} required />
              </div>

              <div className="form-group">
                <label htmlFor="pincode">Pin Code:</label>
                <input id="pincode" type="number" maxlength="6" name="pincode" 
                className="form-control" onChange={this.handleChange} 
                pattern="^[1-9][0-9]{6}"
                value={pincode} required />
              </div> 

              <div className="my-5">
                <button type="submit" 
                  className="btn btn-square btn-block btn-lg btn-app-primary">
                    SUBMIT
                </button>
              </div>
            </form>
          </div>
        </div>
			</div>
		);
	}
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
 }
}

export default connect(mapStateToProps, { addBillingAddress })
  (EditBillingAddress);

