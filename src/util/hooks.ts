import { useLocalStorage } from "usehooks-ts";
import type {
  INewGameData,
  ILocationGuess,
  ILocation,
  IGameState,
} from "../types";
import { calculateDistance, calculateScore } from "./challenge";

export function useChallenge(
  challenge: INewGameData
): [IGameState, (location: ILocation) => void] {
  const { location, images } = challenge;
  const { lat, lng } = location;
  const key = `v1__CHALLENGE__${lat}${lng}`;
  const [state, setState] = useLocalStorage(key, {
    id: key,
    location,
    images,
    guesses: [] as ILocationGuess[],
    isFinished: false,
  });
  const newGuess = (position: ILocation) => {
    const distance = calculateDistance(location, position);
    const score = calculateScore(100, distance);
    if (distance >= 1000) {
      console.debug(
        Math.round((distance / 1000 + Number.EPSILON) * 10) / 10 + "km"
      );
    } else {
      console.debug(Math.round(distance) + "m");
    }
    const newGuess = {
      ...position,
      score,
      distance,
    };
    const updatedGuesses = [...state.guesses, newGuess];
    const newState = {
      ...state,
      guesses: updatedGuesses,
    };
    setState(newState);
  };

  return [state, newGuess];
}
