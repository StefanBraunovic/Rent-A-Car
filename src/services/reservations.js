import axiosInstance from './axios';

export const getAllReservations = ({queryKey, pageParam = 1}) => {
  return axiosInstance.get('reservations?page=' + pageParam, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt-token')}`,
    },
  });
};
