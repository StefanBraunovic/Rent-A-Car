import React from 'react';
import uuid from 'react-uuid';

const ShowReservation = ({
  reservationId,
  from_date,
  to_date,
  rentLocation,
  returnLocation,
  totalPrice,
  plateNo,
  prodYear,
  carType,
  noSeats,
  pd,
  equip,
}) => {
  return (
    <div style={{textAlign: 'center', backgroundColor: 'skyblue'}}>
      <h2>Reservation</h2>
      <p key={uuid()}>From date: {from_date} </p>
      <p key={uuid()}>To date: {to_date} </p>
      <p key={uuid()}>Rent location: {rentLocation} </p>
      <p key={uuid()}>Return location: {returnLocation} </p>
      <p key={uuid()}>Total price: {totalPrice} €</p>
      <h2 key={uuid()}>Vehicle</h2>
      <p key={uuid()}>Plate number: {plateNo}</p>
      <p key={uuid()}>Production Year: {prodYear}</p>
      <p key={uuid()}>Car Type: {carType}</p>
      <p key={uuid()}>Number of seats {noSeats}</p>
      <p key={uuid()}>Price/Day {pd}</p>
      <h3 key={uuid()}>Equipment</h3>
      {equip.map(item => {
        return (
          <>
            <p key={uuid()}>
              {item.name} - {item.max_quantity}
            </p>
          </>
        );
      })}
    </div>
  );
};

export default ShowReservation;
