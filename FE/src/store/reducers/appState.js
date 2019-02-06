import { SET_APP_STATE } from '../actionTypes'

export default (state = {}, action) => {
	switch(action.type) {
		case SET_APP_STATE:
			return { ...state, state:action.data };
		default:
			return state;
	}
};