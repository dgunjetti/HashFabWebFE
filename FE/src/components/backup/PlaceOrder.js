import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPreOrderCart } from '../store/actions/preOrderCart'
import postOrder from '../store/actions/order'
import { Link } from 'react-router-dom'


class PlaceOrder extends Component {
	constructor(props) {
		super(props);
		this.postOrder = this.postOrder.bind(this);
	}

	postOrder() {
		debugger;
		this.props.postOrder(
				this.props.currentUser.user.id, 
				this.props.products)
		.then(() => this.props.history.push("/buy/ordercomplete"))
		.catch(err => console.log(err));
	}

	render() {
		var products = this.props.products;

		if (products === undefined) {
			return (<div>Loading...</div>);
		}
		let ps = products.map(p => (<div>{p.name}</div>));
		
		return(
			<div>
				<div>
					delivery address
				</div>
				<div>
					Payment method
				</div>
				<div>
					{ps}
				</div>
				<button onClick={this.postOrder}>Place Order and Pay Now</button>
			</div>
			);
	}
}

function mapStateToProps(state) {
  return {
    products: state.preOrderCart.products,
    currentUser: state.currentUser
 }
}

export default connect(mapStateToProps, { postOrder })(PlaceOrder);