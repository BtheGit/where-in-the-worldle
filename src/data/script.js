import fs from "fs";

const BASE_URL = "https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/";
const RESOLUTION = "640x480@2x";
// The fallback is to support netlify where the .env file isnt available to the vite build.
const ACCESS_TOKEN =
  "pk.eyJ1IjoiYnJlbmRhbmJlbHR6IiwiYSI6ImNqOTdzdzdqNTBhcXAzM3FtbGl0emZrZGQifQ.sO7oyXvLzP3NsnYm5cr_BA";

const getStaticUrl = ({ lat, lng, zoom }) =>
  `${BASE_URL}pin-s+a316ca(${lng},${lat})/${lng},${lat},${zoom}/${RESOLUTION}?access_token=${ACCESS_TOKEN}&logo=false`;

const sourceMapImagesByLocation = ({ lat, lng }) => {
  const ZOOM_LEVELS = [15.5, 14, 12, 10, 8, 6.5, 3];
  const images = ZOOM_LEVELS.map((zoom) => getStaticUrl({ lat, lng, zoom }));
  return images;
};

const blob = fs.readFileSync("./worldcities_over100k.json", "utf8");
const WORLD_CITIES = JSON.parse(blob);

const withImageUrls = WORLD_CITIES.map((data) => {
  const images = sourceMapImagesByLocation(data);
  data["images"] = images;
  return data;
});

console.log(withImageUrls.length);

const grouped = Object.groupBy(withImageUrls, ({ country }) => country);

const counts = Object.entries(grouped)
  .sort(([, a], [, b]) => b.length - a.length)
  .map(([country, cities]) => `${country}: ${cities.length}`);

// fs.writeFileSync("./country_groups.json", JSON.stringify(grouped));
