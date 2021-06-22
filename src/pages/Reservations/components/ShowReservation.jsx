import React from 'react';

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
      <p>From date: {from_date} </p>
      <p>To date: {to_date} </p>
      <p>Rent location: {rentLocation} </p>
      <p>Return location: {returnLocation} </p>
      <p>Total price: {totalPrice} €</p>
      <h2>Vehicle</h2>
      <p>Plate number: {plateNo}</p>
      <p>Production Year: {prodYear}</p>
      <p>Car Type: {carType}</p>
      <p>Number of seats {noSeats}</p>
      <p>Price/Day {pd}</p>
      <h3>Equipment</h3>
      {equip.map(item => {
        return (
          <>
            <p>
              {item.name} - {item.max_quantity}
            </p>
          </>
        );
      })}
    </div>
  );
};

export default ShowReservation;
