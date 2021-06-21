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
      formData.append('photo[]', ...data[prop]);
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

export const updateVehicle = data => {
  const vehicleData = {
    plate_no: data.plate_no,
    production_year: String(data.production_year),
    car_type_id: data.car_type_id,
    no_of_seats: data.no_of_seats,
    price_per_day: data.price_per_day,
    remarks: data.remarks,
    'photo[]': data.photo,
  };
  console.log(data.photo);
  console.log(data.photo);
  return axiosInstance.post(`vehicle-update/${data.id}`, vehicleData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt-token')}`,
      'Content-Type': 'application/json',
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
  //console.log(queryKey)
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
