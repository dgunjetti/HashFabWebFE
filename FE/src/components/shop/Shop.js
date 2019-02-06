import React, { Component } from 'react'
import ProductList from '../shop/ProductList'
import { connect } from 'react-redux'
import getPreviewInfo from '../../store/actions/preview'
import { cleanupApiMessage } from '../../store/actions/apiMessage'
import HrWithText from '../home/HrWithText'
import CategoryList from '../shop/CategoryList'
import Footer from '../home/Footer'

class Shop extends Component {

  componentWillMount(){
    this.props.getPreviewInfo();
  }

	renderOrderStatus = (order) => {
  	if ((order !== undefined) && (order.status !== undefined)) {
  		if (order.status === "success") {
  			return (
					<div className="alert alert-success text-center">
						Order is successfully placed, Tracking number is {order.txnid}
					</div>
				);
  		} else {
  			return (
					<div className="alert alert-danger text-center">
						{order.status}
					</div>
				);
  		}
		}
  }

  renderApiMessage = (apiMessage) => {
  	if ((apiMessage.message !== undefined) && (apiMessage.message !== "")) {
  		return (
				<div className="alert alert-success text-center mt-3">
					{apiMessage.message}
				</div>
			);
		}			
  }

	render() {
		const { products, order, categories, apiMessage, history } = this.props;

		// history.listen(() => {
		// 	this.props.cleanupApiMessage();
		// }); 

		if (products !== undefined) {
			const ps = products.filter(p => p.tag === "new");
			return (
				<div className="d-flex flex-column justify-content-between">
					<div className="mt-3">
						{this.renderOrderStatus(order)}
						{this.renderApiMessage(apiMessage)}
						<CategoryList {...this.props} categories={categories}/>
					</div>
					<Footer />
				</div>
			);
		}
		return(<div>Loading...</div>); 
	}
}

function mapStateToProps(state) {
	return {
		order: state.order,
		products: state.preview.products,
		categories: state.preview.categories,
		apiMessage: state.apiMessage
	};
}

export default connect(mapStateToProps, { getPreviewInfo, cleanupApiMessage })(Shop);