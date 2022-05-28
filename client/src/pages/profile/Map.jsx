import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import useGeoLocation from '../../hooks/useGeoLocation';

function Map({ position, setPosition }) {
  const { location, getGeoLocation } = useGeoLocation(null);
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    if (location.coordinates?.lat && location.coordinates?.lng) {
      setPosition(location.coordinates);
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
          mapContainerClassName="google_map mt-3"
          center={position}
          zoom={currentLocation ? 12 : 8}
          onClick={onLoad}
        >
          <Marker position={position} />
        </GoogleMap>
      </LoadScript>
      <button
        className="nameInput mt-3"
        onClick={getCurrentGeoLocation}
        type="button"
      >
        הוסף מיקום נוכחי
      </button>
    </React.Fragment>
  );
}

export default Map;
