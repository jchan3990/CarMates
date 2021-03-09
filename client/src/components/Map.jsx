import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

import client from '../utils/googleMapsClient.js';
import { gMapsKey } from '../../../config.js';

const Map = ({ geocode }) => {
  const defaultCenter = {
    lat: 37.334160,
    lng: -121.888682
  }

  const style = {
    height: "100%",
    width: "100%",
  }

  return (
    <div className='map-container'>
      <LoadScript
        googleMapsApiKey={gMapsKey}>
          <GoogleMap
            mapContainerStyle={style}
            zoom={10}
            center={defaultCenter}
          />
      </LoadScript>
    </div>
  )
};

export default Map;