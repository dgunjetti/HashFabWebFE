import apiCall from '../../services/api'
import { SET_MY_ORDER, CLEANUP_MY_ORDER } 
		from '../actionTypes'
import { addError } from './errors'

export function setMyOrder(data) {
	return {
		type: SET_MY_ORDER,
		data
	};
}

export function cleanupMyOrder() {
	return {
		type: CLEANUP_MY_ORDER,
	};
}

export default function getMyOrders(userId) {
	return dispatch => {
		return new Promise((resolve, reject) => {
			return apiCall("get", `/api/user/${userId}/order`)
				.then(data => {
					dispatch(setMyOrder(data));
				})
				.catch(err => {
					dispatch(addError(err.message));
					reject();
				});
		});
	};
}