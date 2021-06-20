import {RESERVATION_STATUS} from '../constants/constants';
import {message} from 'antd';

export const auth = () => {
  return JSON.parse(localStorage.getItem('auth'));
};

const getValidDate = function (d) {
  return new Date(d);
};

const validateDateBetweenTwoDates = (fromDate, toDate, givenDate) => {
  return (
    getValidDate(givenDate) <= getValidDate(toDate) &&
    getValidDate(givenDate) >= getValidDate(fromDate)
  );
};

export const getReservationStatus = (fromDate, toDate, givenDate) => {
  if (validateDateBetweenTwoDates(fromDate, toDate, givenDate)) {
    return RESERVATION_STATUS.PRESENT;
  } else {
    return getValidDate(givenDate) > getValidDate(toDate)
      ? RESERVATION_STATUS.PREVIOUS
      : RESERVATION_STATUS.FUTURE;
  }
};

export const saveAuth = user => {
  localStorage.setItem(
    'auth',
    JSON.stringify({
      name: user.name,
      token: user.token,
      role: user.role,
    }),
  );
};

export const concatData = data => {
  let arrData = [];
  let pages = data?.pages;
  if (pages) {
    pages.forEach(e => {
      if (e.items) {
        arrData[e?.page - 1] = e.items;
      }
    });
  }
  return [].concat.apply([], arrData);
};

export const concatData1 = data => {
  let arrData = [];
  let pages = data?.pages;
  if (pages) {
    pages.forEach(e => {
      if (e.items) {
        arrData[e?.page - 1] = e.items;
      }
    });
  }
  return [].concat.apply([], arrData);
};

export const getEquipmentData = data => {
  let newData = {...data};
  newData.equipment = [];
  for (let i in data) {
    if (i?.startsWith('_')) {
      newData.equipment.push({
        equipment_id: i.substring(1),
        quantity: data[i] || 0,
      });
      delete newData[i];
    }
  }
  return newData;
};

export const calcDays = (from_date, to_date, price_per_day) => {
  if (from_date && to_date) {
    let days = to_date.diff(from_date, 'days');

    if (days > 0) return days * price_per_day;
    else return 0;
  } else {
    return 0;
  }
};

export const dataToOptions = data => {
  return data.map(e => Object({value: e.id, label: e.name}));
};
