import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getPreOrderCart } from '../store/actions/preOrderCart'

class PaySelect extends Component {

	componentWillMount() {
    this.props.getPreOrderCart();
  }

	render() {
		const products = this.props.products;

		if (products === undefined) {
			return (<div>Loading...</div>);
		}
		const ps = products.map(p => (<div>{p.name}</div>));
		return(
			<div>
				Select Payment method for product
				{ps}
				<Link to="/buy/placeorder">
					<button>Continue</button>
				</Link>
			</div>
			);
	}
}

function mapStateToProps(reduxState) {
  return {
    products: reduxState.preOrderCart.products
 }
}

export default connect(mapStateToProps, { getPreOrderCart })(PaySelect);