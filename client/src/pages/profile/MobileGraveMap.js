import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '150px',
  borderRadius:"10px"
};

const onLoad = (marker) => {
  console.log('marker: ', marker);
};

const GraveMap = ({ graveLocation }) => {
  return (
    <LoadScript googleMapsApiKey="AIzaSyD9pgeqLi_nElWfwzmIOH9g_SNe5vKhhLk">
      <GoogleMap
        id="marker-example"
        mapContainerStyle={mapContainerStyle}
        zoom={9}
        center={graveLocation}
      >
        <Marker onLoad={onLoad} position={graveLocation} />
      </GoogleMap>
    </LoadScript>
  );
};

export default GraveMap;