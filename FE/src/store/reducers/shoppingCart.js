import { 
	ADD_TO_SHOPPING_CART, 
	REMOVE_FROM_SHOPPING_CART, 
	GET_SHOPPING_CART,
	DELETE_SHOPPING_CART,
	UPDATE_SHOPPING_CART,
	ADD_DELIVERY_ADDRESS,
	ADD_BILLING_ADDRESS,
	CLEANUP_CART_ADD_STATUS
} from '../actionTypes'

export default (state = { items: [] }, action) => {
	switch(action.type){
		case ADD_TO_SHOPPING_CART:
			let found = 0;
			for (var i =0; i < state.items.length; i++) {
				if (state.items[i].product.id === action.data.product.id) {
					found = 1;
					break;
				}
			}
			if (found === 1) {
				return {...state, addStatus: "Already added to cart"};
			}

			let newState = Object.assign(
					{ ...state, items: [...state.items, action.data] });

			let cartTotal = {subTotal: 0, shipping: 0, total: 0};
			newState.items.forEach(function(i) {
				cartTotal.subTotal += i.product.price * i.quantity;
			});
			cartTotal.shipping = 0;
			cartTotal.total = cartTotal.subTotal + cartTotal.shipping;
			newState.cartTotal = cartTotal;
			newState.addStatus = "success";
			return newState;

		case REMOVE_FROM_SHOPPING_CART:
			let items = state.items.filter(i => i.product.id !== action.id);
      newState = Object.assign({ ...state, items });

			cartTotal = {subTotal: 0, shipping: 0, total: 0};
			newState.items.forEach(function(i) {
				cartTotal.subTotal += i.product.price * i.quantity;
			});
			cartTotal.shipping = 0;
			cartTotal.total = cartTotal.subTotal + cartTotal.shipping;
			newState.cartTotal = cartTotal;
    	return newState;

    case UPDATE_SHOPPING_CART:
      items = state.items.map(i => (
      	 	i.product.id === action.data.id ?
      	 	{product: i.product, quantity: action.data.quantity } :
      		{product: i.product, quantity: i.quantity }));

    	for(var i=0; i < state.items.length; i++){
        var item = state.items[i];
        if (item.product.id === action.data.id) {
        	items[i].quantity = action.data.quantity;
 					items[i].product = item.product;
        } else {
        	items[i]=state.items[i];
        }
    	}

    	newState = Object.assign({ ...state, items });

			cartTotal = {subTotal: 0, shipping: 0, total: 0};
			newState.items.forEach(function(i) {
				cartTotal.subTotal += i.product.price * i.quantity;
			});
			cartTotal.shipping = 0;
			cartTotal.total = cartTotal.subTotal + cartTotal.shipping;
			newState.cartTotal = cartTotal;
    	return newState;

    case ADD_DELIVERY_ADDRESS:
    	return {...state, deliveryAddress: action.data};

    case ADD_BILLING_ADDRESS:
    	return {...state, billingAddress: action.data};
    
    case DELETE_SHOPPING_CART:
    	return { ...state, items: [], cartTotal: {}, deliveryAddress: {}, billingAddress:{} };

    case CLEANUP_CART_ADD_STATUS:
    	return { ...state, addStatus:""};

		case GET_SHOPPING_CART: 
			return state;

		default:
			return state;
	}
}