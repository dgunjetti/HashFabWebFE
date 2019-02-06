import { 
	SET_ORDER_STATUS, 
	CLEANUP_ORDER_STATUS, 
	GET_ORDER_STATUS
} from '../actionTypes'

export default (state = { }, action) => {
	switch(action.type){
		case SET_ORDER_STATUS:
			return { ...state, status: action.data.status, txnid: action.data.txnid };
    case CLEANUP_ORDER_STATUS:
    	return { ...state, status:"", txnid: "" };
		case GET_ORDER_STATUS: 
		default:
			return state;
	}
}