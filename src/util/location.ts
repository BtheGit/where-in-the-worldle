// import WORLD_CITIES from "../../data/worldcities.json";
import WORLD_CITIES from "../data/worldcitiesdev.json";
import type { IWorldCity } from "../types";

// Trying to implement fix https://github.com/remix-run/remix/issues/1555 runs into problem with fs/promises
// not being available. Will come back to this. Especially since we should be using a db anyway.

// import path from "path";
// import fs from "fs/promises";

// const dataPath = path.join(__dirname, "..", "..", "data", "worldcities.json");

export const getCityData = async () => {
  // const file = await fs.readFile(dataPath, "utf8");
  // return JSON.parse(file);
  return WORLD_CITIES as any;
};

// Maybe use a separate chron to set the daily challenge and then there's no need for a counter here.
// That can just be a separate function.

const counter = 0;

export const getRandomLocation = async (
  seed = Math.floor(Math.random() * 50)
) => {
  const WORLD_CITIES = await getCityData();
  const locData = (WORLD_CITIES as any)[seed];
  return locData;
};

export const getDailyLocation = async () => {
  const WORLD_CITIES = await getCityData();
  return (WORLD_CITIES as any)[counter];
};

// NOTE: LocationIds will be a unique DB key eventually.
export const getLocationById = async (locationId: number) => {
  const WORLD_CITIES = await getCityData();
  const filtered = (WORLD_CITIES as any).filter(
    ({ id }: IWorldCity) => id === locationId
  );
  return filtered.length ? filtered[0] : null;
};
