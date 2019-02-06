import React, { Component } from 'react'
import './Product.css'
import ShowProduct from './ShowProduct'


class Product extends Component {

  onClick = () => {
		this.props.history.push(`/products/${this.props.product.id}`)
	}

	render() {
		const {name, imgs, price, category} = this.props.product;
		return(
			<div className="col-lg-4 col-md-6 col-sm-12 pt-4 box-product" 
					style={{border: "2px solid #fcfcfc"}}>
				<a onClick={this.onClick}>
					<img className="img-fluid product-img w-100" src={imgs[0]} alt={name}/>
				</a>				
				<div className="box-text  p-3">
					<p className="text-mute op-7 box-category">{category.toUpperCase()}</p>
					<p className="product-name" onClick={this.onClick}>{name}</p>
					<p className="amount" onClick={this.onClick}><i className="fa fa-inr"></i>{price}</p>
				</div>
			</div>
		);
	}
}

export default Product;