import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

import client from '../utils/googleMapsClient.js';
import { gMapsKey } from '../../../config.js';

const Map = ({ lat, long }) => {
  const defaultCenter = {
    lat: 37.334160,
    lng: -121.888682,
  }

  let userCenter;
  (lat !== undefined || long !== undefined) ? userCenter = {'lat': lat, 'lng': long} : userCenter = defaultCenter;

  const style = {
    height: "400px",
    width: "100%",
  }

  return (
    <div className='map-container'>
      <LoadScript
        googleMapsApiKey={gMapsKey}>
          <GoogleMap
            mapContainerStyle={style}
            zoom={10}
            center={userCenter}
          >
            <Marker position={userCenter} />
          </GoogleMap>
      </LoadScript>
    </div>
  )
};

export default Map;