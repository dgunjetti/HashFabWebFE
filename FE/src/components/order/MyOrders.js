import React, { Component } from 'react'
import { connect } from 'react-redux'
import getOrders from '../../store/actions/myOrder'
import Spinner from '../home/Spinner'
import OrderItem from './OrderItem'
import { Link } from 'react-router-dom'
import './PlaceOrder.css'
import Media from "react-media"

function renderCart(ps, cartTotal) {
	return(
		<div className="card mb-3">
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
			</div>
		</div>
	);
}

function renderDeliveryAddress(deliveryAddress){
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

function renderBillingAddress(billingAddress) {
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

function renderStatus(id, status) {
	return(
		<div className="card mb-2">
			<div className="card-body">
				<h5>ORDER STATUS</h5>
        <p className="mb-0">Order Id: {id} </p>
        <p><strong>Status: {status}</strong> </p>
			</div>
		</div>
	);
}

function renderOrderTablet(props) {
	let { ps, cartTotal, deliveryAddress, billingAddress, id, status } = props;
	return(
		<section id="order" className="mt-5">
			<div className="container">
				<div className="row">
					<div className="col-md-6 order-items">
						{renderStatus(id, status)}
					</div>
					<div className="col-md-6 order-items">
						{renderCart(ps, cartTotal)}
						{renderDeliveryAddress(deliveryAddress)}
					</div>
				</div>
			</div>
		</section>
	);

}

function renderOrderDesktop(props) {
	let { ps, cartTotal, deliveryAddress, billingAddress, id, status } = props;
	return(
		<section id="order" className="mt-5">
			<div className="container">
				<div className="row">
					<div className="col-md-6 order-items">
						{renderCart(ps, cartTotal)}
					</div>
					<div className="col-md-6 order-items">
						{renderStatus(id, status)}
						{renderDeliveryAddress(deliveryAddress)}
					</div>
				</div>
			</div>
		</section>
	);
}

function renderPerMedia(props) {
	return (
		<Media query="(max-width: 767px)">
			{matches =>
        matches ? (
          renderOrderTablet(props)
        ) : (
          renderOrderDesktop(props)
        )
      }			
		</Media>
	);
}

const Order = (props) => {
	let { ps, cartTotal, deliveryAddress, billingAddress, id, status } = props;

	return(
		renderPerMedia(props)
	);
}

class MyOrders extends Component {
	constructor(props) {
    super(props);
    this.state = {
      loading: false
    }
  }

	componentDidMount() {
	  window.scrollTo(0, 0)
	}

	componentWillMount() {
    this.setState({loading: true});
    this.props.getOrders(this.props.currentUser.user.id)
    .then(() => {
      this.setState({loading: false});   
    })
    .catch(() => this.setState({loading: false}));
  }

  
 
  getRenderArr = (cartItems) => {
  	let ps = cartItems.map(i => (
				<OrderItem key={i.product.id} {...this.props} 
					product={i.product} quantity={i.quantity}
					/>
  		));
    return ps;
	}

	getRenderOrder = (orders) => {
		console.log(orders);
  	let os = orders.map(i => {
  		let ps = this.getRenderArr(i.cart.cartItems);
			return (<Order key={i.id} 
				id = {i.id}
				ps = {ps}
				cartTotal = {i.cart.cartTotal} 
				deliveryAddress = {i.cart.deliveryAddress} 
				billingAddress = {i.cart.billingAddress}
				status = {i.status}
				/>);
  		});
    return os;
	}


	render() {
		const myOrder = this.props.myOrder;

		if (myOrder === undefined || myOrder.items === undefined) {
			return (
				<div>
					<Spinner />
				</div>
			);
		}
		console.log(myOrder.items);

		if (myOrder.items.length === 0) {
			return(
				<div className="container d-flex flex-column mt-5">
					<p className="align-self-center"> 
						You currently dont have any orders
					</p> 
					<Link to="/shop" className="align-self-center">
						<button className="btn btn-square btn-app-primary">
							SHOP
						</button>
					</Link>
				</div>
			);
		} 

		let orders = this.getRenderOrder(myOrder.items.slice());

		return(
			<div>
				{orders}
			</div>
		);
	}
};

function mapStateToProps(state) {
  return {
    myOrder: state.myOrder,
 }
}

export default connect(mapStateToProps, { getOrders })(MyOrders);

