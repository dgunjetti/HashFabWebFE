import { GET_PRODUCTS } from '../actionTypes'

export default (state = [], action) => {
	switch(action.type){
		case GET_PRODUCTS: 
			return {...state, products: action.data};
		default:
			return state;
	}
}