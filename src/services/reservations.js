import axiosInstance from './axios';

export const getAllReservations = ({queryKey, pageParam = 1}) => {
  return axiosInstance.get('reservations?page=' + pageParam, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt-token')}`,
    },
  });
};

export const createReservation = data => {
  return axiosInstance.post('/reservation-store', data, {
    headers: {Authorization: `Bearer ${localStorage.getItem('jwt-token')}`},
  });
};

export const getLocations = () => {
  return axiosInstance.get('/locations', {
    headers: {Authorization: `Bearer ${localStorage.getItem('jwt-token')}`},
  });
};

export const getReservations = (search, page) => {
  let params = {};
  if (search) params.search = search;
  if (page) params.page = page;

  return axiosInstance.get('/reservations', {
    params: params,
    headers: {Authorization: `Bearer ${localStorage.getItem('jwt-token')}`},
  });
};
