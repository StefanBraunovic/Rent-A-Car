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

export const showReservation = id => {
  return axiosInstance.post(`reservation-show${id}`, {
    headers: {Authorization: `Bearer ${localStorage.getItem('jwt-token')}`},
  });
};

export const updateReservation = id => {
  return axiosInstance.post(`reservation-update${id}`, {
    headers: {Authorization: `Bearer ${localStorage.getItem('jwt-token')}`},
  });
};

export const deleteReservation = id => {
  return axiosInstance.delete(`reservation-update${id}`, {
    headers: {Authorization: `Bearer ${localStorage.getItem('jwt-token')}`},
  });
};

export const getLocations = () => {
  return axiosInstance.get('/locations', {
    headers: {Authorization: `Bearer ${localStorage.getItem('jwt-token')}`},
  });
};

export async function getReservations(queryKey) {
  console.log(queryKey);
  const page = queryKey?.pageParam || 1;
  const search = queryKey?.queryKey[1];
  const res = await axiosInstance.get('/reservations', {
    params: {search: search, page: page},
    headers: {Authorization: `Bearer ${localStorage.getItem('jwt-token')}`},
  });

  return {
    items: res?.data?.data,
    page: res?.data?.current_page,
    last_page: res?.data?.last_page,
  };
}
