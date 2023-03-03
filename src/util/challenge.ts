import type { INewGameData } from "../types";
import { getRandomLocation } from "./location";
import { getStaticUrl } from "./mapbox";

// https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula

export function haversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const p = 0.017453292519943295; // Math.PI / 180
  const c = Math.cos;
  const a =
    0.5 -
    c((lat2 - lat1) * p) / 2 +
    (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2;

  return 12742000 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}

export const generate = async () => {
  const location = await getRandomLocation(10);
  const ZOOM_LEVELS = [15.5, 14, 12, 10, 8, 6.5, 3];
  const { lat, lng } = location;
  const images = ZOOM_LEVELS.map((zoom) => getStaticUrl({ lat, lng, zoom }));
  const gameData: INewGameData = { location, images, date: Date.now() };
  return gameData;
};

export const calculateScore = (proportionBasis: number, distance: number) => {
  if (distance <= proportionBasis) {
    // Right location.
    return 5;
  } else if (distance <= proportionBasis * 20) {
    // Right neighborhood.
    return 4;
  } else if (distance <= proportionBasis * 500) {
    // Right metropolitan area.
    return 3;
  } else if (distance <= proportionBasis * 2000) {
    // Rigth small country/province area.
    return 2;
  } else if (distance <= proportionBasis * 20000) {
    // Right sub continent sized area.
    return 1;
  } else {
    return 0;
  }
};

export const calculateDistance = (
  challengeCoords: { lat: number; lng: number },
  guessCoords: { lat: number; lng: number }
): number => {
  const distance = haversineDistance(
    challengeCoords.lat,
    challengeCoords.lng,
    guessCoords.lat,
    guessCoords.lng
  );
  return distance;
};
