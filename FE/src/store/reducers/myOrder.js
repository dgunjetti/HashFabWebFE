import { 
	SET_MY_ORDER, 
	CLEANUP_MY_ORDER 
} from '../actionTypes'

export default (state = { }, action) => {
	switch(action.type){
		case SET_MY_ORDER:
			return { ...state, items: action.data };
    case CLEANUP_MY_ORDER:
    	return { ...state, items: {} };
		default:
			return state;
	}
}