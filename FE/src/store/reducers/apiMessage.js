import { 
	SET_API_MESSAGE, 
	CLEANUP_API_MESSAGE
} from '../actionTypes'

export default (state = { }, action) => {
	switch(action.type){
		case SET_API_MESSAGE:
			return { ...state, message: action.message};
    case CLEANUP_API_MESSAGE:
    	return { ...state, message:""};
		default:
			return state;
	}
}