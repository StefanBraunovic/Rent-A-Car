import React from 'react';
import {Image} from 'antd';
import uuid from 'react-uuid';

const ShowVehicle = ({
  photos,
  plates,
  prodYear,
  seats,
  carType,
  pricePerDay,
  remarks,
}) => {
  console.log('vehicle photos', photos);
  return (
    <div style={{textAlign: 'center', backgroundColor: 'skyblue'}}>
      <h3>Car Info</h3>
      <p key={uuid()}>Plates -{plates}</p>
      <p key={uuid()}>Production Year - {prodYear}</p>
      <p key={uuid()}>Seats - {seats}</p>
      <p key={uuid()}>Car Type - {carType}</p>
      <p key={uuid()}>Price/Day - {pricePerDay}</p>
      <p key={uuid()}>Additional Remarks - {remarks}</p>
      {photos.map(photo => {
        return (
          <Image
            width={200}
            height={200}
            src={`http://akademija-api.proserver.me/${photo.photo}`}
          />
        );
      })}
    </div>
  );
};

export default ShowVehicle;
