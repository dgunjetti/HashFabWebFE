import React, { Component } from 'react'
import { updateShoppingCart } from '../../store/actions/shoppingCart'
import { connect } from 'react-redux'
import './CartItem.css'

class CartItemTablet extends Component {
  constructor(props) {
    super(props);
    this.state = {
  		quantity: 0
    };
  }

  qty_minus = () => {
    let quantity = this.state.quantity;
    if (quantity > 1) {
      quantity--;
      this.setState({
        quantity
      });
      this.props.updateShoppingCart(
          { id: this.props.product.id,
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
      this.props.updateShoppingCart(
          { id: this.props.product.id,
            quantity
          });
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    debugger;
  	const p = this.props.product;
    const quantity = this.props.quantity;
    const nameStyle = {
      color: "#334862"
    }
    
    if (this.state.quantity === 0) {
      this.setState({quantity});
    }

  	return(
  		<div className="mb-4 tab-cart">
				<div className="d-flex flex-row mb-3">
					<i className="fa fa-times-circle-o align-self-center cart-remove mr-3" 
						onClick={() => this.props.removeFromShoppingCart(this.props.product.id)}>
          </i>
					
          <img width="100" height="100" src={p.img} alt="" 
						className="img-fluid align-self-center mr-3"/>	
          <div>
            <span className="" style={nameStyle}>
              {p.name}
            </span>
            <br />
            <span className="">
              Quantity: {this.state.quantity}
            </span>
            <br />
            <span className="">
              Price: <i className="fa fa-inr"></i>{p.price}
            </span>
          </div>
				</div>
        <div className="d-flex flex-row justify-content-around">
          <div className="quantity-container align-self-center">
            <div className="quantity">
              <input type="button" value="-" className="quantity-buttons p-2" 
                onClick={this.qty_minus}/>
              <input type="number" size="2" step="1" inputMode="numeric" pattern="[0-9]*"
                min="1" max="25" value={this.state.quantity} className="text-center" 
                name="quantity" onChange={this.handleChange}/>
              <input type="button"  value="+" className="quantity-buttons p-2" 
                onClick={this.qty_plus}/>
            </div>   
          </div>      

          <div className="align-self-center">
            <span>
              <strong><i className="fa fa-inr"></i>{p.price * this.state.quantity}</strong>
            </span>
          </div>
			  </div>
      </div>
  	);
  }
}

export default connect(null, { updateShoppingCart })(CartItemTablet);
