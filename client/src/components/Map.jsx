import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

import { gMapsKey } from '../../../config.js';

const Map = () => {
  const style = {
    height: "100%",
    width: "100%",
  }

  const defaultCenter = {
    lat: 41.3851,
    lng: 2.1734
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