import React, { Component } from 'react'
import './ShowProduct.css'
import { connect } from 'react-redux'
import Modal from 'react-modal'


class ShowProduct extends Component {
	constructor(props) {
		super(props);
		this.addToCart = this.addToCart.bind(this);

		this.state = {
			quantity: 1
		}
	}

	addToCart() {
		const {id} = this.props.product;
		this.props.addToShoppingCart(id, this.state.quantity);
		this.handleModalClose();
	}


	qty_minus = () => {
		let quantity = this.state.quantity;
		if (quantity > 1) {
			quantity--;
			this.setState({
				quantity
			});
		}
	}

	qty_plus = () => {
		let quantity = this.state.quantity;
		if (quantity < 25) {
			quantity++;
			this.setState({
				quantity
			});
		}
	}

	handleModalClose = () => {
		this.props.modalClose();
	}

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	render() {
		const {name, img, description, price, category} = this.props.product;
		const { modalIsOpen, modalClose } = this.props;
		const quantityStyle = {
			fontSize: "1.4em"
		}
		const quantityButtonStyle = {
			padding: "0 0.6em"
		}

		return(
			<Modal
        className="Modal__Bootstrap modal-dialog modal-dialog-centered prod-modal-dimension"
        closeTimeoutMS={150}
        isOpen={modalIsOpen}
        onRequestClose={this.handleModalClose}
      >
	      <div className="modal-content">
	        <div className="modal-body p-0">
	        	<button type="button" className="close mt-2 mr-3" onClick={modalClose}>
	          	<span aria-hidden="true" className="cross">&times;</span>
	            <span className="sr-only">Close</span>
	          </button>
	          <div className="row">
							<div className="col-md-6 col-sm-12 text-center p-0">
								<img className="img-fluid w-100 h-100" src={img} alt={name} />
							</div>
							<div className="col-md-6 col-sm-12 my-4">	
								<h2>{name}</h2>
								<div className="divider"></div>
								<p className="lead price"><i className="fa fa-inr"></i>{price}</p>
								<p>{description}</p>
								
								<div className="quantity-container">
									<div className="quantity" style={quantityStyle}>
										<input type="button" value="-" className="quantity-buttons" 
											style={quantityButtonStyle} onClick={this.qty_minus}/>
										<input type="number" size="2" step="1" inputMode="numeric" pattern="[0-9]*"
											min="1" max="25" value={this.state.quantity} className="text-center" 
											name="quantity" onChange={this.handleChange}/>
										<input type="button"  value="+" className="quantity-buttons" 
											style={quantityButtonStyle} onClick={this.qty_plus}/>
									</div>		

									<button className="btn btn-lg btn-square add-to-cart-button ml-4" 
										onClick={this.addToCart}>ADD TO CART</button>
								</div>
								<hr className="mt-5"/>
								<p className="text-mute modal-category">Category: {category}</p>
							</div>
						</div>
					</div>		
				</div>
			</Modal>
		);
	}
}

function mapStateToProps(state) {
	return {
		currentUser: state.currentUser,
	};
}

export default connect(mapStateToProps, null)(ShowProduct);


