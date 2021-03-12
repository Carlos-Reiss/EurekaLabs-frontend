import axios from 'axios';

const mapbox = axios.create({
  baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places/',
});

export default mapbox;

//
