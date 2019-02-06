import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class MyProfile extends Component {
	componentDidMount() {
	  window.scrollTo(0, 0)
	}

	editBillingAddress = () => {
		this.props.history.push("/edit-billing-address");
	}

	changePassword = () => {
		this.props.history.push("/change-password");
	}

  billingAddress = () => {
    const { billingAddress } = this.props.currentUser.user;
    if (billingAddress !== undefined) {
      const {name, address, city, state, pincode, mobile} = billingAddress;
      return(
        <div>
          <div className="card mb-5">
          	<div className="card-header">
          		<h6>BILLING ADDRESS</h6>
          	</div>
            <div className="card-body">
              <p className="mb-3"><strong>{name}</strong>
              <br />
              Phone: {mobile}
              <br />
              {address}
              <br />
              {city}, {state} {pincode} </p>

              <button className="btn btn-square btn-app-primary"
              	onClick={this.editBillingAddress}>
                EDIT
              </button>
            </div>
          </div>
        </div>
      );
    } else {
    	return(
        <div className="card mb-5">
        	<div className="card-header">
        		<h6>BILLING ADDRESS</h6>
        	</div>
      		<div className="card-body">
            <button className="btn btn-square btn-app-primary" 
            	onClick={this.editBillingAddress}>
              ADD
            </button>
        	</div>
        </div>
      );
    }
  }

  password = () => {
    return(
      <div>
        <div className="card mb-5">
          <div className="card-header">
          		<h6>LOGIN</h6>
          </div>
          <div className="card-body">
            <p className="mb-3"><strong>Password</strong></p>
            <p>********</p>
            <button className="btn btn-square btn-app-primary" 
              onClick={this.changePassword}>
              EDIT
            </button>
          </div>
        </div>
        <hr/>
      </div>
    );
  }

  breadcrumb = () => {
    return(
      <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumb-item">
          <Link to="/shop">Shop</Link>
        </li>
      </ol>
    </nav>
    );  
  }

	render() {
		return(
			<div className="d-flex flex-column justify-content-between">
				<div className="container mt-5">
					<div className="row justify-content-md-center">
						<div className="col-md-8">
              {this.breadcrumb()}
							<h5>My Profile</h5>
							<hr/>
							{this.billingAddress()}
							{this.password()}
						</div>
					</div>
				</div>
			</div>
		);
	}
};

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
 }
}

export default connect(mapStateToProps, null) (MyProfile);


