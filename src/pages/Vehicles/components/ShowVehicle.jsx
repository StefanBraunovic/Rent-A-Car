import React from 'react';
import {Image} from 'antd';

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
      <p>Plates -{plates}</p>
      <p>Production Year - {prodYear}</p>
      <p>Seats - {seats}</p>
      <p>Car Type - {carType}</p>
      <p>Price/Day - {pricePerDay}</p>
      <p>Additional Remarks - {remarks}</p>
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
