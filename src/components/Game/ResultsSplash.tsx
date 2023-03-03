import { useState } from "react";
import type { IGameState, INewGameData } from "../../types";

export type ResultsSplashProps = {
  challengeState: IGameState;
  date: INewGameData["date"];
};

export default function ResultsSplash(props: ResultsSplashProps) {
  const { challengeState, date } = props;
  const [isActive, setIsActive] = useState(true);
  // TODOS: MVP
  // [x] Challenge date
  // Flavor text based on results
  // [x] Close Button
  // [x] Display guesses with distance
  // Get description of location.
  // Responsive to widescreen on phones. Height is too much currently
  // Time when next challenge available
  if (!isActive) {
    return null;
  }
  return (
    <div className="results-container">
      <>
        <div className="results__nav">
          <button
            className="btn--close"
            onClick={() => {
              setIsActive(false);
            }}
          >
            x
          </button>
        </div>
        <div className="results__main">
          <h1>Results for {new Date(date).toLocaleDateString()}</h1>
          <p>[FLAVOR TEXT]</p>
          <ul className="results__chart">
            {challengeState.guesses.map((guess, i) => {
              const { distance, score } = guess;
              const roundedDistance = `${
                distance >= 1000
                  ? Math.round(((distance / 1000 + Number.EPSILON) * 10) / 10)
                  : Math.round(distance)
              }`;
              const units = distance >= 1000 ? "km" : "m";

              return (
                <li key={i}>
                  <div className={`score score--${score}`}>
                    <p>{i + 1}.</p>
                    <p className="guess-distance">
                      {roundedDistance}
                      <span>{units}</span>
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
          <div>
            <p>Come back tomorrow to play again.</p>
            <p>
              The next daily challenge will be available in [live countdown]
            </p>
          </div>
        </div>
      </>
    </div>
  );
}
