import axiosInstance from './axios';

export const getAllClients = ({pageParam = 1}) => {
  return axiosInstance.get('clients?page=' + pageParam, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt-token')}`,
    },
  });
};

export const getClients = (search, page) => {
  let params = {};
  if (search) params.search = search;
  if (page) params.page = page;

  return axiosInstance.get('/clients', {
    params: params,
    headers: {Authorization: `Bearer ${localStorage.getItem('jwt-token')}`},
  });
};

export const getUser = userId => {
  return axiosInstance.get(`user-show/${userId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt-token')}`,
    },
  });
};

export const getAllCountries = () => {
  return axiosInstance.get('countries', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt-token')}`,
    },
  });
};

export const deleteUser = id => {
  return axiosInstance.delete(`user-delete/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt-token')}`,
    },
  });
};

export const updateClient = (data, id) => {
  return axiosInstance.post(`/user-update/${id}`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
  });
};

export const createClient = data => {
  return axiosInstance.post('/user-store', data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt-token')}`,
    },
  });
};
