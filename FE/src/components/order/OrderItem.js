import React from 'react'

const OrderItem = (props) => {
	const p = props.product;
  const quantity = props.quantity;
	console.log(p);
	return(
		<tr className="order-item">
			<td>
				<div className="d-flex flex-column">
					<span>{p.name}</span>	
					<span className="text-mute"> 
						Quantity: {quantity} &nbsp; &nbsp;
						Price: <i className="fa fa-inr"></i>{p.price}
					</span>
				</div>
			</td>
			<td>
				<p className="align-self-center">
					<i className="fa fa-inr"></i>{p.price * quantity}
				</p>
			</td>
		</tr>
	);
}


export default OrderItem;
