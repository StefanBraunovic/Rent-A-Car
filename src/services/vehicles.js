import axiosInstance from './axios';

export const getAllVehicles = ({queryKey, pageParam = 1}) => {
  return axiosInstance.get('vehicles?page=' + pageParam, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt-token')}`,
    },
  });
};
