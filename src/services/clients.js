import axiosInstance from './axios';
import {dataToOptions} from '../functions/helper';

export const getAllClients = ({queryKey, pageParam = 1}) => {
  let url = 'clients?page=' + pageParam;
  if (queryKey[1]) {
    url += `&search=${queryKey[1]}`;
  }
  return axiosInstance.get(url, {
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

export async function getClientsOptions(search, loadedOptions, {page}) {
  const res = await axiosInstance.get('/clients', {
    params: {page: page},
    headers: {Authorization: `Bearer ${localStorage.getItem('jwt-token')}`},
  });

  return {
    options: dataToOptions(res?.data?.data),
    hasMore: res?.data?.current_page < res?.data?.last_page,
    additional: {
      page: page + 1,
    },
  };
}

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

export const updateClient = async data => {
  const clientData = {
    name: data.name,
    email: data.email,
    phone_no: data.phone_no,
    identification_document_no: String(data.identification_document_no),
    country_id: String(data.country_id),
  };

  axiosInstance.post(`user-update/${data.user.id}`, clientData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt-token')}`,
      'Content-Type': 'application/json',
    },
  });
  // console.log('req', req);
};

export const createClient = data => {
  const clientData = {
    name: data.name,
    email: data.email,
    phone_no: String(data.phone_no),
    identification_document_no: String(data.identification_document_no),
    country_id: String(data.country_id),
  };
  return axiosInstance.post('/user-store', clientData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt-token')}`,
      'Content-Type': 'application/json',
    },
  });
};
