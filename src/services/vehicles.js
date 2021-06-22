import axiosInstance from './axios';

export const getAllVehicles = ({queryKey, pageParam = 1}) => {
  let url = 'vehicles?page=' + pageParam;
  if (queryKey[1]) {
    url += `&search=${queryKey[1]}`;
  }
  return axiosInstance.get(url, {
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
  const formData = new FormData();
  Object.keys(data).forEach(prop => {
    if (prop === 'photo') {
      const photosData = data[prop];
   
      Object.keys(photosData).forEach((photoIndex) => {
        formData.append('photo[]', photosData[photoIndex]);
      })
    } else {
      formData.append(prop, data[prop]);
    }
    
  });
  return axiosInstance.post(`vehicle`, formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt-token')}`,
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const updateVehicle = (data, id) => {
  const formData = new FormData();
  console.log('data', data, id);
  Object.keys(data).forEach(prop => {
    if (prop === 'photo') {
      const photosData = data[prop];
  
      Object.keys(photosData).forEach((photoIndex) => {
        formData.append('photo[]', photosData[photoIndex]);
      })
    } else {
      formData.append(prop, data[prop]);
    }

  });

  return axiosInstance.post(`vehicle-update/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt-token')}`,
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getEquipment = () => {
  return axiosInstance.post(`equipment`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt-token')}`,
    },
  });
};
export async function getAvailableVehicles(queryKey) {
  const page = queryKey?.pageParam || 1;
  const search = queryKey?.queryKey[1];
  const res = await axiosInstance.get('/cars-available', {
    params: {...search, page: page},
    headers: {Authorization: `Bearer ${localStorage.getItem('jwt-token')}`},
  });

  return {
    items: res?.data?.data,
    page: res?.data?.current_page,
    last_page: res?.data?.last_page,
  };
}
