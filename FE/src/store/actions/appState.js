import { SET_APP_STATE } from '../actionTypes'

export function setState(data) {
	return {
		type: SET_APP_STATE,
		data
	};
}

export default function setAppState(state) {
  return dispatch => {
  	dispatch(setState(state));
  }
}