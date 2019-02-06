import React, { Component } from 'react'
import Product from './Product'
import './ProductList.css'
import { connect } from 'react-redux'
import { addToShoppingCart } from '../../store/actions/shoppingCart'
import { Switch, Route } from 'react-router-dom'
import ShowProduct from './ShowProduct'




class ProductList extends Component {
	constructor(props) {
		super(props)
		this.getProduct = this.getProduct.bind(this);
		this.addToShoppingCart = this.addToShoppingCart.bind(this);
	}

	RenderProductList = (ps) => {
		return (
			<div className="row no-gutters">			
				{ps}
			</div>
		);
	}

  getProduct(id) {
  	var products = this.props.products;

  	for(var i = 0; i < products.length; i++) {
  		var n = products[i].id.localeCompare(id);
  		if (n === 0) {
  			return Object.assign({}, products[i]);
  		}
  	}
  }

  getRenderArr(products){
    var ps = products.map(p => (
    			<Product key={p.id} {...this.props} product={p} getProduct={this.getProduct} 
        				addToShoppingCart={this.addToShoppingCart}/>
        	));
    return ps;
	}

  addToShoppingCart(id, quantity) {
  	const product = this.getProduct(id);
		this.props.addToShoppingCart({product, quantity});
  }

	render() {
		const { products } = this.props;

		if (products === undefined) {
			return (<div>Loading...</div>);
		}

		const ps = this.getRenderArr(products);

		return (
			this.RenderProductList(ps)
		);		
	}
}


export default connect(null, { addToShoppingCart })(ProductList);
