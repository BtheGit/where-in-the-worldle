import { useLocalStorage, useSessionStorage } from "usehooks-ts";
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
  const key = `WITW__v1__CHALLENGE__${lat}${lng}`;
  // Using sessionStorage while in dev. Should use env flag, but whatever for now.
  const [state, setState] = useSessionStorage(key, {
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
    // End game conditions:
    // 1. No more turns. Determine by using the length of the images array compared to the guesses array. If they match, every image has been seen and guessed, and we're done.
    // 2. Has pinpointed. Note, I don't want everyone to feel like they need to 5k to get it right. So we will treat a score of 4 or 5 as a win. That means that if you get
    // pretty close but not exact, you can't try again. This may not be popular.
    if (updatedGuesses.length >= state.images.length || score >= 4) {
      newState.isFinished = true;
    }

    setState(newState);
  };

  return [state, newGuess];
}
