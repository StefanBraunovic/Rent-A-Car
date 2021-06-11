import axiosInstance from './axios';

export const getAllClients = ({ queryKey, pageParam }) => {
	return axiosInstance.get('clients?page=' + pageParam, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem('jwt-token')}`,
		},
	});
};
