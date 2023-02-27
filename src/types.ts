export interface ILocationGuess {
  lat: number;
  lng: number;
  distance: number;
  score: number;
}

export interface IWorldCity {
  admin_name: string;
  capital: string | null;
  city: string;
  city_ascii: string;
  country: string;
  id: number;
  iso2: string;
  iso3: string;
  lat: number;
  lng: number;
  population: number;
}

export interface INewGameData {
  location: IWorldCity;
  images: string[];
}
