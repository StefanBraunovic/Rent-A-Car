import axiosInstance from './axios';

export const getAllClients = ({queryKey, pageParam = 1}) => {
  return axiosInstance.get('clients?page=' + pageParam, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt-token')}`,
    },
  });
};

// api/countries

export const getAllCountries = () => {
  return axiosInstance.get('countries', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt-token')}`,
    },
  });
};

export const deleteUser = id => {
  return axiosInstance.get(`user-delete/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt-token')}`,
    },
  });
};