// For reference https://docs.mapbox.com/api/maps/static-images/#static-images-api-restrictions-and-limits

const BASE_URL = "https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/";
const RESOLUTION = "640x480@2x";
// TODO: Access Token in KV/function - not client.
const ACCESS_TOKEN =
  "pk.eyJ1IjoiYnJlbmRhbmJlbHR6IiwiYSI6ImNqOTdzdzdqNTBhcXAzM3FtbGl0emZrZGQifQ.sO7oyXvLzP3NsnYm5cr_BA";

export interface IMapboxStaticUrlSettings {
  lat: number;
  lng: number;
  zoom: number;
}

export const getStaticUrl = ({ lat, lng, zoom }: IMapboxStaticUrlSettings) =>
  `${BASE_URL}pin-s+a316ca(${lng},${lat})/${lng},${lat},${zoom}/${RESOLUTION}?access_token=${ACCESS_TOKEN}&logo=false`;
