export type ILocationGuess = {
  lat: number;
  lng: number;
  distance: number;
  score: number;
};

export type IWorldCity = {
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
};

export type INewGameData = {
  location: IWorldCity;
  images: string[];
};

export type ILocation = {
  lat: number;
  lng: number;
};

export type IGameState = {
  id: string;
  location: ILocation;
  images: string[];
  guesses: ILocationGuess[];
  isFinished: boolean;
};
