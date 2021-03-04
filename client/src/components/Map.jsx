import React, { useState } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

import { gMapsKey } from '../../../config.js';

const Map = () => {
  const defaultCenter = {
    lat: 37.334160,
    lng: -121.888682
  }

  const [center, setCenter] = useState(geocode === undefined ? defaultCenter : geocode);
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