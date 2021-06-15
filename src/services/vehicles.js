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

export const getAvailableVehicles = (start_date, end_date, car_type) => {
  let params = {};
  params.car_type = car_type;
  params.start_date = start_date ? start_date : '1900-01-01';
  params.end_date = end_date ? end_date : '2100-01-01';

  return axiosInstance.get('/cars-available', {
    params: params,
    headers: {Authorization: `Bearer ${localStorage.getItem('jwt-token')}`},
  });
};
