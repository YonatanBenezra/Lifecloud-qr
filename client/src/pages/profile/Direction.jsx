import React, { useState } from 'react';
import {
  GoogleMap,
  LoadScript,
  DirectionsService,
  DirectionsRenderer,
} from '@react-google-maps/api';

const location = { lat: 30.928370265478026, lng: 34.81864101562498 };

const Direction = ({ origin, destination }) => {
  const [response, setResponse] = useState(null);
  const directionsCallback = (res) => {
    if (res != null) {
      setResponse(res);
    }
  };

  return (
    <div>
      <LoadScript googleMapsApiKey="AIzaSyD9pgeqLi_nElWfwzmIOH9g_SNe5vKhhLk">
        <GoogleMap
          id="direction-example"
          mapContainerStyle={{
            width: '800px',
            height: '500px',
          }}
          zoom={9}
          center={location}
        >
          <DirectionsService
            options={{
              origin: origin,
              destination: destination,
              travelMode: 'DRIVING',
            }}
            callback={directionsCallback}
          />

          {response !== null && (
            <DirectionsRenderer
              options={{
                directions: response,
              }}
            />
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default React.memo(Direction);
