import React, { Component } from 'react'
import { connect } from 'react-redux'
import './PlaceOrder.css'
import OrderItem from './OrderItem'
import { Link } from 'react-router-dom'
import postOrder from '../../store/actions/order'
import { deleteShoppingCart } 
				from '../../store/actions/shoppingCart'
import Media from "react-media"


class PlaceOrder extends Component {
	
	componentDidMount() {
	  window.scrollTo(0, 0)
	}

  placeOrder = () => {
		this.props.postOrder(
			this.props.currentUser.user.id, 
			{
				cartItems: this.props.cartItems,
				cartTotal: this.props.cartTotal,
				billingAddress: this.props.billingAddress,
				deliveryAddress: this.props.deliveryAddress,
			})
		.then(() => {
			this.props.deleteShoppingCart();
			this.props.history.push("/shop");
		}).catch(err => console.log(err));
  }

  title = () => {
  	return(
  		<nav className="text-center checkout-breadcrumbs my-5">
  			<span className="d-none d-md-inline-block">SHOPPING CART</span>
  			<span className="cb-divider d-none d-md-inline-block">
  				<i className="fa fa-angle-right"></i>
  			</span>
  			<span className="d-none d-md-inline-block">CHECKOUT DETAILS</span>
  			<span className="cb-divider d-none d-md-inline-block">
  				<i className="fa fa-angle-right"></i>
  				</span>
  			<span className="current">REVIEW ORDER & PAY</span>
  			<span className="cb-divider d-none d-md-inline-block">
  				<i className="fa fa-angle-right"></i>
  			</span>
  			<span className="d-none d-md-inline-block">ORDER COMPLETE</span>
  		</nav>
  	);
  }

  renderDeliveryAddress = (deliveryAddress) => {
  	return(
  		<div className="card mb-5">
				<div className="card-body">
					<h5>DELIVERY ADDRESS</h5>
	        <p className="mb-2"><strong>{deliveryAddress.name}</strong>
	        <br />
	        {deliveryAddress.address}
	        <br />
	        {deliveryAddress.city}, {deliveryAddress.state} {deliveryAddress.pincode}
	        <br />
	        Phone: {deliveryAddress.mobile}</p>
				</div>
			</div>
  	);
  }

  renderBillingAddress = (billingAddress) => {
  	return(
			<div className="card mb-5">
				<div className="card-body">
					<h5>BILLING ADDRESS</h5>
          <p className="mb-2"><strong>{billingAddress.name}</strong>
          <br />
          {billingAddress.address}
          <br />
          {billingAddress.city}, {billingAddress.state} {billingAddress.pincode}
          <br />
          Phone: {billingAddress.mobile}</p>
				</div>
			</div>
  	);
  }

  renderCart = (ps, cartTotal) => {
  	return(
  		<div className="card mb-5">
				<div className="card-body">
					<h5>YOUR ORDER</h5>
					<table width="100%" className="mb-5">
						<thead>
							<tr>
								<th>PRODUCT</th>
								<th>TOTALS</th>
							</tr>
						</thead>
						<tbody>
							{ps}
							<tr className="order-item">
								<td>
									Shipping
								</td>
								<td>
									<i className="fa fa-inr"></i>
									{cartTotal.shipping}
								</td>
							</tr>
							<tr className="justify-content-between total-border-top">
								<td>
									<strong>Total</strong> 
								</td>
								<td>
									<strong>
										<i className="fa fa-inr"></i>
										{cartTotal.total}
									</strong>
								</td>
							</tr>
						</tbody>
					</table>	
					<button className="btn btn-square btn-block btn-lg btn-app-primary" 
						onClick={this.placeOrder}>
						PROCEED TO PAY &nbsp;
						(&nbsp;<i className="fa fa-inr"></i>{cartTotal.total}&nbsp;)
					</button>		
				</div>
			</div>
  	);
  }

	renderOrderDesktop = (ps) => {
		const { billingAddress, deliveryAddress, cartTotal } = this.props;
		return (
			<section id="order">
				<div className="container">
					{this.title()}
					<div className="row">
						<div className="col-md-6 order-items">
							{this.renderDeliveryAddress(deliveryAddress)}
							{this.renderBillingAddress(billingAddress)}
						</div>

						<div className="col-md-6">
							{this.renderCart(ps, cartTotal)}
						</div>
					</div>
				</div>
			</section>
		);
	}

	renderOrderTablet = (ps) => {
		const { billingAddress, deliveryAddress, cartTotal } = this.props;
		return (
			<section id="order">
				<div className="container">
					{this.title()}
					<div className="row">
						<div className="col-md-12 order-items">
							{this.renderCart(ps, cartTotal)}
						</div>

						<div className="col-md-12">
							{this.renderDeliveryAddress(deliveryAddress)}
							{this.renderBillingAddress(billingAddress)}
						</div>
					</div>
				</div>
			</section>
		);
	}

  getRenderArr(cartItems){
  	const ps = cartItems.map(i => (
				<OrderItem key={i.product.id} {...this.props} 
					product={i.product} quantity={i.quantity}
					/>
  		));
    return ps;
	}

	renderPerMedia = (ps) => {
		return (
			<Media query="(max-width: 767px)">
				{matches =>
          matches ? (
            this.renderOrderTablet(ps)
          ) : (
            this.renderOrderDesktop(ps)
          )
        }			
			</Media>
		);
	}

	render() {
		const cartItems = this.props.cartItems;

		if (cartItems === undefined) {
			return (<div>Loading...</div>);
		}

		if (cartItems.length === 0) {
			return(<div>Shopping cart is empty</div>)
		}
		
		const ps = this.getRenderArr(cartItems);

		return(
				this.renderPerMedia(ps)
			);
	}
}

function mapStateToProps(state) {
  return {
    cartItems: state.shoppingCart.items,
    cartTotal: state.shoppingCart.cartTotal,
    billingAddress: state.currentUser.user.billingAddress,
    deliveryAddress: state.shoppingCart.deliveryAddress,
    currentUser: state.currentUser
 }
}

export default connect(mapStateToProps, { postOrder, deleteShoppingCart })(PlaceOrder);
