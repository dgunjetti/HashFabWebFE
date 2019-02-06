import apiCall from '../../services/api'
import { SET_ORDER_STATUS, CLEANUP_ORDER_STATUS, GET_ORDER_STATUS } 
		from '../actionTypes'
import { addError } from './errors'

export function setOrderStatus(data) {
	return {
		type: SET_ORDER_STATUS,
		data
	};
}

export function cleanupOrderStatus() {
	return {
		type: CLEANUP_ORDER_STATUS,
	};
}

export function getOrderStatus() {
	return {
		type: GET_ORDER_STATUS,
	};
}


export default function postOrder(userId, data) {
	return dispatch => {
		return new Promise((resolve, reject) => {
			return apiCall("post", `/api/user/${userId}/order`, { cart: data })
				.then(payReq => {
					console.log("calling bolt api");
					console.log(payReq);
					window.bolt.launch(payReq, {
							responseHandler: function (payRes) {
								console.log("payumoney response");
								console.log(payRes.response);
								return apiCall("post", `/api/user/${userId}/order/payment`, 
															{payInfo: payRes.response})
									.then(payConfirm => {
										console.log("response from dev server");
										console.log(payConfirm);
										dispatch(setOrderStatus(payConfirm));
										resolve();
									})
									.catch(err => {
										dispatch(addError(err.message));
										reject();
									});
							},
							catchException: function(error) {
								console.log("payumoney error");
								console.log(error);
								reject();
							}
					});
				})
				.catch(err => {
					dispatch(addError(err.message));
					reject();
				});
		});
	};
}