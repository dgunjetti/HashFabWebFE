import React, { Component } from 'react'
import { updateShoppingCart } from '../../store/actions/shoppingCart'
import { connect } from 'react-redux'
import './CartItem.css'

class CartItem extends Component {
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
  	const p = this.props.product;
    const quantity = this.props.quantity;
    const nameStyle = {
      color: "#334862"
    }
    
    if (this.state.quantity === 0) {
      this.setState({quantity});
    }
    
  	console.log(p);
  	return(
  		<tr className="cart-item">
  			<td>
  				<div className="d-flex flex-row">
  					<i className="fa fa-times-circle-o align-self-center cart-remove mr-3" 
							onClick={() => this.props.removeFromShoppingCart(this.props.product.id)}>
            </i>
						<img width="100" height="100" src={p.imgs[0]} alt="" 
							className="img-fluid align-self-center mr-3"/>	
						<span className="align-self-center" style={nameStyle}>
              {p.name}
            </span>
					</div>
  			</td>
  			<td>
  				<span className="align-self-center">
  					<strong><i className="fa fa-inr"></i>{p.price}</strong>
  				</span>
  			</td>
  			<td>
          <div className="quantity-container">
            <div className="quantity">
              <input type="button" value="-" className="quantity-buttons" 
                onClick={this.qty_minus}/>
              <input type="number" size="2" step="1" inputMode="numeric" pattern="[0-9]*"
                min="1" max="25" value={this.state.quantity} className="text-center" 
                name="quantity" onChange={this.handleChange}/>
              <input type="button"  value="+" className="quantity-buttons" 
                onClick={this.qty_plus}/>
            </div>   
          </div> 			
  			</td>
  			<td>
  				<span className="align-self-center">
  					<strong><i className="fa fa-inr"></i>{p.price * this.props.quantity}</strong>
  				</span>
  			</td>
  		</tr>
  	);
  }
}

export default connect(null, { updateShoppingCart })(CartItem);
