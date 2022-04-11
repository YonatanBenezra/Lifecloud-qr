import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import useGeoLocation from '../../hooks/useGeoLocation';

const containerStyle = {
  width: 'auto',
  height: '200px',
};

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
 <div>
    <div>
      <LoadScript googleMapsApiKey="AIzaSyD9pgeqLi_nElWfwzmIOH9g_SNe5vKhhLk">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={position}
          zoom={currentLocation ? 12 : 8}
          onClick={onLoad}
        >
          <Marker position={position} />
        </GoogleMap>
      </LoadScript>
      </div>
     <div className="mpBtnBox"> <button
        className="mpBtn"
        onClick={getCurrentGeoLocation}
        type="button"
      >
        Add my current location
      </button></div>
    </div>
  );
}

export default Map;