import React, { Component} from 'react'
import './Navbar.css'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getShoppingCart } from '../store/actions/shoppingCart'
import { logout } from '../store/actions/auth'
import LogIn from '../components/user/LogIn'
import SignUp from '../components/user/SignUp'
import Media from "react-media"

class Navbar extends Component {
  constructor(props) {
    super(props);
  }

	onLogoutClick = e => {
		e.preventDefault();
		console.log(this.props.currentUser.user);
		this.props.logout(this.props.currentUser.user.id);
		this.props.history.push("/");
	}

	onLoginClick = (e) => {
		e.preventDefault();
		console.log("login clicked");
		this.props.history.push('/login');
	}
	
	onSignupClick = (e) => {
		e.preventDefault();
		this.props.history.push('/signup');
	}

	onProfileClick = (e) => {
		e.preventDefault();
		this.props.history.push('/myprofile');
	}

	onOrdersClick = (e) => {
		e.preventDefault();
		this.props.history.push('/myorders');
	}

	renderPerMedia = (count, total, currentUser) => {
		return (
			<Media query="(max-width: 599px)">
				{matches =>
          matches ? (
          	this.renderForTab(count, total, currentUser)     
          ) : (
            this.renderForDesktop(count, total, currentUser)
          )
        }
      </Media>
		);
	}
	
	renderForDesktop = (count, total, currentUser) => {
		return (
			<nav className="navbar navbar-expand navbar-light fixed-top py-2">
				<div className="container">
					<Link to="/" className="navbar-brand brand">#FAB</Link>
					{currentUser.isAuthenticated ? (
						<div>
							<ul className="navbar-nav ml-auto">
								<li className="nav-item dropdown">
									<a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">
										{currentUser.user.name}
									</a>
									<div className="dropdown-menu">
									<a className="dropdown-item" onClick={this.onProfileClick}>
										My Profile
									</a>
									<a className="dropdown-item" onClick={this.onOrdersClick}>
										My Orders
									</a>
									<hr className="mt-0 mb-0"/>
									<a className="dropdown-item" onClick={this.onLogoutClick}>
											Logout
										</a>
									</div>
								</li>
								<li className="nav-item">
										<Link className="nav-link" to="/shoppingcart">
											CART / <i className="fa fa-inr"></i>{total}									 
										</Link>
								</li>
							</ul>
						</div>
					) : (
						<div>
							<ul className="navbar-nav ml-auto">
								<li></li>
								<li className="nav-item">
									<a className="nav-link" onClick={this.onLoginClick}>LOGIN</a>
								</li>
								<li className="nav-item">
									<Link className="nav-link" to="/shoppingcart">
										CART / <i className="fa fa-inr"></i>{total}									 
									</Link>
								</li>
							</ul>
						</div>
					)}
				</div>
			</nav>
		);
	}

	renderForTab = (count, total, currentUser) => {
		return (
			<nav className="navbar navbar-expand navbar-light fixed-top">
				<div className="container">
				  <ul className="nav navbar-nav float-left">
			      <li className="nav-item dropdown tab-toggler">
			        <button className=" dropdown-toggle" data-toggle="dropdown">
								<span 
									className="navbar-toggler-icon" 
									>
								</span>
							</button>
							{currentUser.isAuthenticated ? (
								<div className="dropdown-menu">
									<h6 className="dropdown-header">
										{currentUser.user.name}
									</h6>
									<a className="dropdown-item" onClick={this.onProfileClick}>
										My Profile
									</a>
									<a className="dropdown-item" onClick={this.onOrdersClick}>
										My Orders
									</a>
									<a className="dropdown-item" onClick={this.onLogoutClick}>
										Logout
									</a>
								</div>
							) : (
								<div className="dropdown-menu">
									<a className="dropdown-item" onClick={this.onLoginClick}>LOGIN</a>
									<a className="dropdown-item" onClick={this.onSignupClick}>SIGN UP</a>
								</div>
							)}
			      </li>
			    </ul>
			    <ul className="nav navbar-nav navbar-brand mx-auto">
			      <li className="nav-item">
			        <Link to="/" className="nav-link mx-auto brand">#FAB</Link>
			      </li>
			    </ul>
			    <ul className="nav navbar-nav float-right">
			      <li className="nav-item">
			        <Link to="/shoppingcart">
								CART / <i className="fa fa-inr"></i>{total}									 
							</Link>
			      </li>
			    </ul>
				</div>
			</nav>
		);
	}

	render() {
		let count = 0;
		let total = 0;

		if (this.props.cartItems !== undefined) {
			count = this.props.cartItems.length;
		}
		if ((this.props.cartTotal !== undefined) &&
				(this.props.cartTotal.total !== undefined)) {
			total = this.props.cartTotal.total;
		}

		const { currentUser } = this.props;

		return (
			this.renderPerMedia(count, total, currentUser)
		);
	}
}

function mapStateToProps(state) {
  return {
    cartItems: state.shoppingCart.items,
    cartTotal: state.shoppingCart.cartTotal,
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps, { getShoppingCart, logout })(Navbar);


/*
navbar-expand-sm - 576px
navbar-expand-lg - 992px
navbar-expand-xl - 1200px
*/