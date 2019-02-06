import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPreOrderCart } from '../store/actions/preOrderCart'

class OrderComplete extends Component {
	render() {
		var products = this.props.products;
		if (products === undefined) {
			return (<div>Loading...</div>);
		}
		let ps = products.map(p => (<div>{p.name}</div>));
		return(
			<div>
				<div>
					Thank you for order for:
				</div>
				{ps}
				<div>
					Order tracking Number
				</div>
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

export default connect(mapStateToProps, null)(OrderComplete);