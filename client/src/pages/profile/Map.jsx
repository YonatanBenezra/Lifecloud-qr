import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import useGeoLocation from '../../hooks/useGeoLocation';

const containerStyle = {
  width: '800px',
  height: '600px',
};

const center = { lat: 30.928370265478026, lng: 34.81864101562498 };

function Map({ position, setPosition }) {
  const { location, getGeoLocation } = useGeoLocation();
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    if (location.coordinates?.lat && location.coordinates?.lng) {
      console.log(location.coordinates);
      setCurrentLocation(location.coordinates);
    }
  }, [location, setPosition]);

  const getCurrentGeoLocation = () => {
    getGeoLocation();
  };

  const onLoad = (mapInfo) => {
    setPosition({ lat: mapInfo.latLng.lat(), lng: mapInfo.latLng.lng() });
  };

  return (
    <React.Fragment>
      <LoadScript googleMapsApiKey="AIzaSyD9pgeqLi_nElWfwzmIOH9g_SNe5vKhhLk">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={currentLocation || center}
          zoom={currentLocation ? 12 : 8}
          onClick={onLoad}
        >
          <Marker position={position} />
        </GoogleMap>
      </LoadScript>
      <button
        className="nameInput"
        onClick={getCurrentGeoLocation}
        type="button"
      >
        Add my current location
      </button>
    </React.Fragment>
  );
}

export default Map;