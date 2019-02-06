import React, { Component } from 'react'
import '../user/SignUp.css'
import Modal from 'react-modal';
import { addDeliveryAddress, setDeliveryAddress } from '../../store/actions/shoppingCart'
import { connect } from 'react-redux'
import Spinner from '../home/Spinner'

class DeliveryAddress extends Component {
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
		this.handleSubmit = this.handleSubmit.bind(this);
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
    this.props.addDeliveryAddress(
    	this.props.currentUser.user.id,
    	addr)
    .then(() => {
      this.setState({loading: false});
    	this.props.history.push('/order');
    }).catch(err => {
    	console.log(err);
      this.setState({loading: false});
    });
	}

  setDeliveryAddress = e => {
    const { deliveryAddress } = this.props.currentUser.user;
    const { billingAddress } = this.props.currentUser.user;

    if (deliveryAddress !== undefined) { 
      this.props.setDeliveryAddress(
          this.props.currentUser.user.deliveryAddress
        );
      this.props.history.push('/order');
    } else {
      this.props.addDeliveryAddress(
      this.props.currentUser.user.id,
      billingAddress)
      .then(() => {
        this.props.history.push('/order');
      }).catch(err => {
        console.log(err);
      });
    }
  }

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

  title = () => {
    return(
      <nav className="text-center checkout-breadcrumbs my-5">
        <span className="d-none d-md-inline-block">CHECKOUT DETAILS</span>
        <span className="cb-divider d-none d-md-inline-block">
          <i className="fa fa-angle-right"></i>
        </span>
        <span className="d-none d-md-inline-block">BILLING ADDRESS</span>
        <span className="cb-divider d-none d-md-inline-block"><i className="fa fa-angle-right"></i></span>
        <span className="current">DELIVERY ADDRESS</span>
      </nav>
    );
  }

  recentAddress = () => {
    const { billingAddress } = this.props.currentUser.user;
    const { deliveryAddress } = this.props.currentUser.user;

    if (billingAddress !== undefined) {
      if (deliveryAddress === undefined) {
        var {name, address, city, state, pincode, mobile} = billingAddress;
      } else {
        var {name, address, city, state, pincode, mobile} = deliveryAddress;
      }
      return(
        <div>
          <div className="card mb-5">
            <div className="card-body">
              <p className="mb-3"><strong>{name}</strong>
              <br />
              {address}
              <br />
              {city}, {state} {pincode}
              <br />
              Phone: {mobile}</p>
              <button className="btn btn-square btn-app-primary" 
                onClick={this.setDeliveryAddress}>
                DELIVER TO THIS ADDRESS
              </button>
            </div>
          </div>
          <hr/>
        </div>
      );
    }
  }


	render() {
		const { name, address, city, state, pincode, mobile } = this.state;

		return (
      <div className="container">
        {this.state.loading && (
          <Spinner />
        )}
        {this.title()}
        <div className="row justify-content-md-center">
          <div className="col-md-6">
            {this.recentAddress()}
            <h5>ADD DELIVERY ADDRESS </h5>
            <form onSubmit={this.handleSubmit}>
              
              <div className="form-group">
                <label htmlFor="name">Full Name:</label>
                <input id="name" maxLength="50" type="text" name="name" 
                className="form-control" onChange={this.handleChange} 
                 value={name} required />
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
                <input id="pincode" type="number" name="pincode" 
                className="form-control" onChange={this.handleChange} 
                pattern="^[1-9][0-9]{6}"
                value={pincode} required />
              </div> 

              <div className="form-group">
                <label htmlFor="mobile">Mobile Number:</label>
                <input id="mobile"  type="tel" name="mobile" 
                className="form-control" onChange={this.handleChange} 
                value={mobile} 
                pattern="^((\+*)((0[ -]+)*|(91 )*)(\d{12}|\d{10}))|\d{5}([- ]*)\d{6}$"
                required />
              </div>

              <div className="my-5">
                <button type="submit" 
                  className="btn btn-square btn-block btn-lg btn-app-primary">
                    DELIVER TO THIS ADDRESS
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

export default connect(mapStateToProps, { addDeliveryAddress, setDeliveryAddress })
  (DeliveryAddress);

