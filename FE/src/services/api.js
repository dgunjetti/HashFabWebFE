import axios from 'axios'
import config from '../config';

export function setTokenHeader(token) {
	if (token) {
		axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
	} else {
		delete axios.defaults.headers.common["Authorization"]; 
	}
}

export default function apiCall(method, path, data) {
	return new Promise((resolve, reject) => {
		if (!process.env.REACT_APP_PRODUCTION) {
			var path1 = path;
		} else {
			var path1 = `http://${config.apiServer}${path}`;
		}
		return axios[method](path1, data).then (res => {
			return resolve(res.data);
		}).catch (err => {
			if (err && err.response && err.response.data) {
				return reject(err.response.data.error);
			}
			console.log(err);
		});
	});
}