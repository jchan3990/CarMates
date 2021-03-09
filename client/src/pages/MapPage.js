import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useQuery } from '@apollo/react-hooks';

import { FETCH_ALL_USERS_QUERY } from '../utils/graphql.js';
import client from '../utils/googleMapsClient.js';
import { gMapsKey } from '../../../config.js';

const MapPage = (props) => {
  const { data: { getAllUsers: allUsersData } = {} } = useQuery(FETCH_ALL_USERS_QUERY);

  let mapWithMarkers;
  if (!allUsersData) return <h2>Loading user locations</h2>;
  else {
    const defaultCenter = {
      lat: 40.964462,
      lng: -103.952952,
    }

    const style = {
      height: "380px",
      width: "100%",
    }

    mapWithMarkers = (
      <div className='map-page-container'>
        <LoadScript
          googleMapsApiKey={gMapsKey}>
            <GoogleMap
              mapContainerStyle={style}
              zoom={2}
              center={defaultCenter}
            >
              {allUsersData.map(user => (
                <span key={user.id}>
                  <Marker position={{lat: user.lat, lng: user.long}} />
                </span>
              ))}
            </GoogleMap>
        </LoadScript>
      </div>
    )
  }

  return (
    <div>
      {mapWithMarkers}
    </div>
  )
};

export default MapPage;