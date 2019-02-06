import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getShoppingCart, removeFromShoppingCart } 
				from '../../store/actions/shoppingCart'
import setAppState 
				from '../../store/actions/appState'
import Media from "react-media"
import './ShoppingCart.css'
import CartItem from './CartItem'
import CartItemTablet from './CartItemTablet'
import { Link } from 'react-router-dom'
import LogIn from '../user/LogIn'
import SignUp from '../user/SignUp'
import BillingAddress from '../order/BillingAddress'

class ShoppingCart extends Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
    this.props.getShoppingCart();
  }

  componentDidMount() {
	  window.scrollTo(0, 0)
	}

  proceedToCheckout = () => {
  	const {currentUser} = this.props;
  	if (!currentUser.isAuthenticated) {
  		this.props.setAppState("checkout");
  		this.props.history.push('/login');
  	} else {
  		this.props.history.push("/checkout/billing-address");
  	}
  }

  removeFromShoppingCart = (id) => {
  	this.props.removeFromShoppingCart(id);
  }

  breadcrumbs = () => {
  	return(
  		<nav className="text-center checkout-breadcrumbs my-5">
  			<span className="current">SHOPPING CART</span>
  			<span className="cb-divider d-none d-md-inline-block">
  				<i className="fa fa-angle-right"></i>
  			</span>
  			<span className="d-none d-md-inline-block">CHECKOUT DETAILS</span>
  			<span className="cb-divider d-none d-md-inline-block">
  				<i className="fa fa-angle-right"></i>
  				</span>
  			<span className="d-none d-md-inline-block">REVIEW ORDER & PAY</span>
  			<span className="cb-divider d-none d-md-inline-block">
  				<i className="fa fa-angle-right"></i>
  			</span>
  			<span className="d-none d-md-inline-block">ORDER COMPLETE</span>
  		</nav>
  	);
  }

  renderTable = (ps) => {
  	return (
  		<div>
	  		<table width="100%" className="mb-3">
					<thead>
						<tr>
							<th>PRODUCT</th>
							<th>PRICE</th>
							<th>QUANTITY</th>
							<th>SUBTOTAL</th>
						</tr>
					</thead>
					<tbody>
						{ps}
					</tbody>
				</table>	
				<Link to="/shop">
				<button className="btn btn-square continue-shopping-button">
					<i className="fa fa-angle-left"></i>&nbsp;&nbsp;CONTINUE SHOPPING
				</button>
				</Link>  			
  		</div>
  	);
  }

  renderCartTotal = () => {
  	return (
  		<div>
				<table width="100%" className="mb-5">
					<thead>
						<tr>
							<th>
								CART TOTALS
							</th>
						</tr>
					</thead>
					<tbody className="totals">
						<tr className="d-flex flex-row justify-content-between cart-subtotal">
							<td>
								SubTotal
							</td>
							<td>
								<i className="fa fa-inr"></i>
								{this.props.cartTotal.subTotal}
							</td>
						</tr>
						<tr className="d-flex flex-row justify-content-between">
							<td>
								Shipping
							</td>
							<td>
								<i className="fa fa-inr"></i>
								{this.props.cartTotal.shipping}
							</td>
						</tr>
						<tr className="d-flex flex-row justify-content-between">
							<td>
								<strong>Total</strong> 
							</td>
							<td>
								<strong>
									<i className="fa fa-inr"></i>
									{this.props.cartTotal.total}
								</strong>
							</td>
						</tr>
					</tbody>
				</table>
				<button className="btn btn-square btn-block btn-lg add-to-cart-button" 
					onClick={this.proceedToCheckout}>PROCEED TO CHECKOUT</button>
			</div>		
  	);
  }

	renderDesktop = (cartItems) => {
		const ps = this.getCartItemDesktopArr(cartItems);
		return (
			<section id="shopping-cart">
				<div className="container">
					{this.breadcrumbs()}
					<div className="row">
						<div className="col-lg-8 cart-items px-4 mb-5">
							<div className="card">
								<div className="card-body">
									{this.renderTable(ps)}
								</div>
							</div>	
						</div>
						<div className="col-lg-4 px-4">
							<div className="card">
								<div className="card-body">
									{this.renderCartTotal()}
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		);
	}

	renderCartTablet = (ps) => {
		return(
			<div>
				{ps}
			</div>
		);
	}

	getCartItemTabletArr = (cartItems) => {
		console.log("cartItems");
  	const ps = cartItems.map(i => (
				<CartItemTablet key={i.product.id} {...this.props} 
					product={i.product} quantity={i.quantity}
					removeFromShoppingCart={this.removeFromShoppingCart}
					/>
  		));
    return ps;
	}
  
  renderCartForTablet = (cartItems) => {
  	const ps = this.getCartItemTabletArr(cartItems);

  	return(
			<section id="shopping-cart">
				<div className="container">
					{this.breadcrumbs()}
					<div className="row">
						<div className="col-md-12 px-4 mb-5">
							<div className="card">
								<div className="card-body">
									{this.renderCartTotal()}
								</div>
							</div>
						</div>
						<div className="col-md-12  px-4">
							<div className="card mb-5">
								<div className="card-body">
									<p style={{fontWeight: "bold"}}>CART</p>
									{this.renderCartTablet(ps)}
								</div>
							</div>
							<Link to="/shop">
								<button className="btn btn-square continue-shopping-button mb-5">
									<i className="fa fa-angle-left"></i>&nbsp;&nbsp;CONTINUE SHOPPING
								</button>
							</Link> 	
						</div>
					</div>
				</div>
			</section>
  	);
  }

  renderPerMedia = (cartItems) => {
		return (
			<Media query="(max-width: 767px)">
				{matches =>
          matches ? (
            this.renderCartForTablet(cartItems)
          ) : (
            this.renderDesktop(cartItems)
          )
        }			
			</Media>
		);
	}

  getCartItemDesktopArr(cartItems){
  	const ps = cartItems.map(i => (
				<CartItem key={i.product.id} {...this.props} 
					product={i.product} quantity={i.quantity}
					removeFromShoppingCart={this.removeFromShoppingCart}
					/>
  		));
    return ps;
	}



	render() {
		const cartItems = this.props.cartItems;

		if (cartItems === undefined) {
			return (<div>Loading...</div>);
		}

		if (cartItems.length === 0) {
			return(
				<div className="container d-flex flex-column mt-5">
					<p className="align-self-center"> 
						Your shopping cart is currently empty
					</p> 
					<Link to="/shop" className="align-self-center">
						<button className="btn btn-square btn-app-primary">
							RETURN TO SHOP
						</button>
					</Link>
				</div>
			);
		}

		return(
			this.renderPerMedia(cartItems)
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


export default connect(mapStateToProps, 
		{ getShoppingCart, removeFromShoppingCart, setAppState})(ShoppingCart);
