import React, { Component } from 'react'
import getPreviewInfo from '../../store/actions/preview'
import './ShowProduct.css'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import { addToCart, cleanupCartAddStatus } 
	from '../../store/actions/shoppingCart'
import { Link } from 'react-router-dom'

class ProductPage extends Component {
	constructor(props) {
		super(props);
		this.addToCart = this.addToCart.bind(this);

		this.state = {
			quantity: 1,
		}
	}

	componentWillMount(){
		if (this.props.products === undefined) {
    	this.props.getPreviewInfo();
		}
  }

  componentDidMount() {
	  window.scrollTo(0, 0)
	}

	addToCart() {

		const id = parseInt(this.props.match.params.id);
		const { products } = this.props;
		const product = products.filter(p => p.id === id);

		this.props.addToCart({product: product[0], quantity: this.state.quantity});

		this.buttonDOM.blur();
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

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	renderCartAddStatus = (cart) => {
  	if ((cart !== undefined) && (cart.addStatus !== undefined)) {
  		if (cart.addStatus === "success") {
  			return (
					<div className="alert alert-success text-center">
						Added to Cart, &nbsp;&nbsp;
						<Link to="/shoppingcart">
						View Cart
						</Link>
					</div>
				);
  		} else if (cart.addStatus !== ""){
  			return (
					<div className="alert alert-danger text-center">
						{cart.addStatus}
					</div>
				);
  		}
		}
  }

  imgCarousel = (imgs) => {
  	return(
  		<div id="carouselExampleControls" className="carousel slide" data-ride="carousel"
  			data-interval="false">
			  <div className="carousel-inner">
			    <div className="carousel-item active">
			      <img className="d-block w-100" src={imgs[0]} alt="First slide" />
			    </div>
			    <div className="carousel-item">
			      <img className="d-block w-100" src={imgs[1]} alt="Second slide" />
			    </div>
			  </div>
			  <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
			    <span className="fa fa-chevron-circle-left" aria-hidden="true" style={{fontSize: "3rem"}}></span>
			    <span className="sr-only">Previous</span>
			  </a>
			  <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
			    <span className="fa fa-chevron-circle-right" aria-hidden="true" style={{fontSize: "3rem"}}></span>
			    <span className="sr-only">Next</span>
			  </a>
			</div>
  	);
  }

/*
			  <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
			    <span className="fa fa-chevron-circle-right" aria-hidden="true" style={{fontSize: "3rem", color: "#d6d6d6"}}></span>
			    <span className="sr-only">Next</span>
			  </a>
*/
	render() {
		const id = parseInt(this.props.match.params.id);
		const { products, cart, history } = this.props;
		const quantityStyle = {
			fontSize: "1.4em"
		}
		const quantityButtonStyle = {
			padding: "0 0.6em"
		}

		if (products === undefined) {
			return (<div>Loading...</div>);
		}

		history.listen(() => {
			this.props.cleanupCartAddStatus();
		}); 

		const product = products.filter(p => p.id === id);
		const {name, imgs, description, price, category} = product[0];

		return(
			<div className="container mt-5">
				<div className="row">
					<div className="col-md-6 col-sm-12 text-center">
						{this.imgCarousel(imgs)}
					</div>
					<div className="col-md-6 col-sm-12">
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
						<h2>{name}</h2>
						<div className="divider"></div>
						<p className="lead price"><i className="fa fa-inr"></i>{price}</p>
						<p>{description}</p>
						{this.renderCartAddStatus(cart)}
						
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
								onClick={this.addToCart} ref={(buttonDOM) => { this.buttonDOM = buttonDOM; }}>ADD TO CART</button>
						</div>
						<hr className="mt-5"/>
						<p className="text-mute modal-category">Category: {category}</p>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		cart: state.shoppingCart,
		products: state.preview.products,
		currentUser: state.currentUser,
	};
}

export default connect(mapStateToProps, 
		{getPreviewInfo, addToCart, cleanupCartAddStatus})(ProductPage);


