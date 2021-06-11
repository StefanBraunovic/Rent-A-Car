import axios from 'axios';

export const Login = (data) => {
	return axios({
		method: 'POST',
		baseURL: 'http://127.0.0.1:8000/api/',
		url: '/auth/login',
		data: data,
	});
};
