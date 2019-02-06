import apiCall from '../../services/api'
import { addError } from './errors'
import { 
	addDeliveryAddressToUser,
	addBillingAddressToUser,
		} from './auth'
import { 
	ADD_TO_SHOPPING_CART, 
	REMOVE_FROM_SHOPPING_CART, 
	GET_SHOPPING_CART,
	DELETE_SHOPPING_CART,
	UPDATE_SHOPPING_CART,
	ADD_DELIVERY_ADDRESS,
	ADD_BILLING_ADDRESS,
	CLEANUP_CART_ADD_STATUS,
} from '../actionTypes'


export function cleanupCartAddStatus() {
	return {
		type: CLEANUP_CART_ADD_STATUS,
	};
}

export function addToShoppingCart(data) {
	return {
		type: ADD_TO_SHOPPING_CART,
		data
	};
}

export function removeFromShoppingCart(id) {
	return {
		type: REMOVE_FROM_SHOPPING_CART,
		id
	};
}

export function updateShoppingCart(data) {
	return {
		type: UPDATE_SHOPPING_CART,
		data
	};
}

export function addBillingAddressToCart(data) {
	return {
		type: ADD_BILLING_ADDRESS,
		data
	};
}

export function addDeliveryAddressToCart(data) {
	return {
		type: ADD_DELIVERY_ADDRESS,
		data
	};
}

export function deleteShoppingCart() {
	return {
		type: DELETE_SHOPPING_CART,
	};
}

export function getShoppingCart() {
	return {
		type: GET_SHOPPING_CART,
	};
}

export function addDeliveryAddress(userId, data) {
  return dispatch => {
    return new Promise((resolve, reject) => {
    	debugger;
      return apiCall("post", `/api/user/${userId}/checkout/delivery-address`, 
      												{address: data})
        .then((data) => {
          dispatch(addDeliveryAddressToCart(data));
          dispatch(addDeliveryAddressToUser(data));
          resolve();
        })
        .catch(err => {
          dispatch(addError(err.message));
          reject();
        });
    });
  };
}

export function setDeliveryAddress(data) {
  return dispatch => {
    dispatch(addDeliveryAddressToCart(data));
  };
}

export function addBillingAddress(userId, data) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      return apiCall("post", `/api/user/${userId}/checkout/billing-address`, 
      												{address: data})
        .then((data) => {
          dispatch(addBillingAddressToCart(data));
          dispatch(addBillingAddressToUser(data));
          resolve();
        })
        .catch(err => {
          dispatch(addError(err.message));
          reject();
        });
    });
  };
}

export function setBillingAddress(data) {
  return dispatch => {
    dispatch(addBillingAddressToCart(data));
  };
}

export function addToCart(data) {
  return dispatch => {
    dispatch(addToShoppingCart(data));
  }
}