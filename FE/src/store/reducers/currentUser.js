import { 
  SET_CURRENT_USER, 
  ADD_DELIVERY_ADDRESS_USER,
  ADD_BILLING_ADDRESS_USER
} from '../actionTypes'

const DEFAULT_STATE = {
	isAuthenticated: false,
	user: {}
}

export default (state = DEFAULT_STATE, action) => {
	switch(action.type) {
		case SET_CURRENT_USER:
			return {
				isAuthenticated: Object.keys(action.user).length > 0,
				user: action.user
			};
		
		case ADD_DELIVERY_ADDRESS_USER:
			let newState = JSON.parse(JSON.stringify(state));
			newState.user.deliveryAddress = Object.assign({}, action.data);
			console.log(newState);
			return newState;

		case ADD_BILLING_ADDRESS_USER:
			newState = JSON.parse(JSON.stringify(state));
			newState.user.billingAddress = Object.assign({}, action.data);
			console.log(newState);
			return newState;
		default:
			return state;
	}
};