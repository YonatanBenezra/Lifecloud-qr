import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';

const onLoad = (marker) => {
  console.log('marker: ', marker);
};

const GraveMap = ({ graveLocation }) => {
  return (
    <LoadScript googleMapsApiKey="AIzaSyD9pgeqLi_nElWfwzmIOH9g_SNe5vKhhLk">
      <GoogleMap
        zoom={9}
        center={graveLocation}
        mapContainerClassName="google_map"
      >
        <Marker onLoad={onLoad} position={graveLocation} />
      </GoogleMap>
    </LoadScript>
  );
};

export default GraveMap;
