import apiCall from '../../services/api'
import { SET_PREVIEW } from '../actionTypes'
import { addError } from './errors'


export const setPreview = (data) => ({
	type: SET_PREVIEW,
	data
});


export default function getPreviewInfo() {
	console.log('getPreviewInfo called');
	return dispatch => {
		return apiCall("get", "/api/allproducts")
			.then(data => {
				dispatch(setPreview(data));
			})
			.catch(err => {
				dispatch(addError(err));
			});
	};
}
