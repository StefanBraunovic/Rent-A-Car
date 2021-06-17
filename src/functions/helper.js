import {RESERVATION_STATUS} from '../constants/constants';

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
