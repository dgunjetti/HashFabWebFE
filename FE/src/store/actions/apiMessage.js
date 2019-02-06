
import { SET_API_MESSAGE, CLEANUP_API_MESSAGE } 
		from '../actionTypes'

export function setApiMessage(message) {
	return {
		type: SET_API_MESSAGE,
		message
	};
}

export function cleanupApiMessage() {
	return {
		type: CLEANUP_API_MESSAGE,
	};
}