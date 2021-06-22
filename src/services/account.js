import axios from 'axios';
import axiosInstance from './axios';

export const Login = data => {
  return axios({
    method: 'POST',
    baseURL: 'http://akademija-api.proserver.me/api/',
    url: '/auth/login',
    data: data,
  });
};

export const me = token => {
  return axiosInstance.post(
    '/auth/me',
    {},
    {
      headers: {Authorization: `Bearer ${localStorage.getItem('jwt-token')}`},
    },
  );
};

export const logout = () => {
  return axiosInstance.post(
    '/auth/logout',
    {},
    {
      headers: {Authorization: `Bearer ${localStorage.getItem('jwt-token')}`},
    },
  );
};

export const changePassword = data => {
  return axiosInstance.post('/auth/change-password', data, {
    headers: {Authorization: `Bearer ${localStorage.getItem('jwt-token')}`},
  });
};

export const refresh = () => {
  return axiosInstance.post(
    '/auth/refresh',
    {},
    {
      headers: {Authorization: `Bearer ${localStorage.getItem('jwt-token')}`},
    },
  );
};
