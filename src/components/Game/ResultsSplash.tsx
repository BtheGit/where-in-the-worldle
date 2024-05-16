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
      <div className="results__nav">
        <button
          className="btn--close"
          onClick={() => {
            setIsActive(false);
          }}
        >
          ✕
        </button>
      </div>
      <p className="results__location ribbon">
        {challengeState.location.city}, {challengeState.location.country}{" "}
        <span>
          (pop. {challengeState.location.population.toLocaleString()})
        </span>
      </p>
      <div className="results__main">
        {/* <p>[FLAVOR TEXT]</p> */}
        <p className="results__game-title">Where in the Worldle</p>
        <p>#20</p>
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
              <li key={i} className="score-container">
                <div className={`score score--${score}`}>
                  <p className="guess-distance">
                    {roundedDistance}
                    <span>{units}</span>
                  </p>
                  <p className="score__count">{i + 1}</p>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="results__timer-container">
          <p>Next challenge in:</p>
          <p>[TIMER]</p>
        </div>
      </div>
    </div>
  );
}
