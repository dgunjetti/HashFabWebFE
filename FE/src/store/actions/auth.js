import apiCall, { setTokenHeader } from '../../services/api'
import { 
  SET_CURRENT_USER, 
  ADD_DELIVERY_ADDRESS_USER,
  ADD_BILLING_ADDRESS_USER
} from '../actionTypes'
import { addError, removeError } from './errors'
import { deleteShoppingCart } from './shoppingCart'
import { setApiMessage } from './apiMessage'

export function setCurrentUser(user) {
	return {
		type: SET_CURRENT_USER,
		user
	};
}

export function addDeliveryAddressToUser(data) {
  return {
    type: ADD_DELIVERY_ADDRESS_USER,
    data
  };
}

export function addBillingAddressToUser(data) {
  return {
    type: ADD_BILLING_ADDRESS_USER,
    data
  };
}

export function setAuthorizationToken(token) {
  setTokenHeader(token);
}

export function logout(userId) {
  return dispatch => {
    dispatch(deleteShoppingCart());
    localStorage.clear();
    setAuthorizationToken(false);
    dispatch(setCurrentUser({})); 
  }
}

export default function onAuth(authType, userData) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      return apiCall("post", `/api/auth/${authType}`, userData)
        .then(({ token, ...user }) => {
          console.log(token);
          localStorage.setItem("jwtToken", token);
          setAuthorizationToken(token);
          dispatch(setCurrentUser(user));
          dispatch(removeError());
          resolve();
        })
        .catch(err => {
          console.log(err);
          dispatch(addError(err.message));
          reject();
        });
    });
  };
}

export function onAuthChange(authType, userData) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      return apiCall("post", `/api/auth/${authType}`, userData)
        .then((res) => {
          console.log(res);
          dispatch(setApiMessage(res.message));
          dispatch(removeError());
          resolve();
        })
        .catch(err => {
          console.log(err);
          dispatch(addError(err.message));
          reject();
        });
    });
  };
}

export function onChangePassword(id, password) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      return apiCall("post", `/api/auth/change-password/${id}`, password)
        .then((res) => {
          console.log(res);
          dispatch(setApiMessage(res.message));
          dispatch(removeError());
          resolve();
        })
        .catch(err => {
          console.log(err);
          dispatch(addError(err.message));
          reject();
        });
    });
  };
}

export function getUser(userId) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      return apiCall("get", `/api/auth/login/${userId}`, null)
        .then(({...user }) => {
          dispatch(setCurrentUser(user));
          resolve();
        })
        .catch(err => {
          console.log(err);
          dispatch(logout(userId));
          reject();
        });
    });
  };
}