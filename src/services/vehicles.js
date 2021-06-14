import axiosInstance from './axios';

export const getAllVehicles = ({queryKey, pageParam = 1}) => {
  return axiosInstance.get('vehicles?page=' + pageParam, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt-token')}`,
    },
  });
};

export const deleteVehicle = id => {
  return axiosInstance.delete(`vehicle-delete/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt-token')}`,
    },
  });
};

export const getVehicleType = () => {
  return axiosInstance.get(`car-types`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt-token')}`,
    },
  });
};

export const addVehicle = data => {
  return axiosInstance.post(`vehicle`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt-token')}`,
    },
  });
};
