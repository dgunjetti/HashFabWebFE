import { SET_PREVIEW } from '../actionTypes'

export default (state={}, action) => {
	switch(action.type) {
		case SET_PREVIEW: 
			return {...state, 
							banners: action.data.banners,
							products: action.data.products,
							categories: action.data.categories
						};
		default:
			return state;
	}
}