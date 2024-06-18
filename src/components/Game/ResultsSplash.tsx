import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import type { IGameState, INewGameData } from "../../types";
import confetti from "canvas-confetti";
import scoreToColorMap from "../CustomAssets/mapMarkerColorMap";

export type ResultsSplashProps = {
  challengeState: IGameState;
  date: INewGameData["date"];
  isActive: boolean;
  setIsActive: Dispatch<SetStateAction<boolean>>;
};

export default function ResultsSplash(props: ResultsSplashProps) {
  const { challengeState, date, isActive, setIsActive } = props;

  useEffect(() => {
    const score =
      challengeState.guesses[challengeState.guesses.length - 1].score;
    const scoreColor = scoreToColorMap[score];
    const scoreToParticleCountMap = [5, 10, 20, 50, 75, 150];
    const particleCount = scoreToParticleCountMap[score];
    const mapMarker = confetti.shapeFromPath({
      path: "M11.291 21.706 12 21l-.709.706zM12 21l.708.706a1 1 0 0 1-1.417 0l-.006-.007-.017-.017-.062-.063a47.708 47.708 0 0 1-1.04-1.106 49.562 49.562 0 0 1-2.456-2.908c-.892-1.15-1.804-2.45-2.497-3.734C4.535 12.612 4 11.248 4 10c0-4.539 3.592-8 8-8 4.408 0 8 3.461 8 8 0 1.248-.535 2.612-1.213 3.87-.693 1.286-1.604 2.585-2.497 3.735a49.583 49.583 0 0 1-3.496 4.014l-.062.063-.017.017-.006.006L12 21zm0-8a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
    });

    const defaults = {
      scalar: 3,
      spread: 180,
      particleCount: particleCount,
      angle: 90,
      startVelocity: 40,
      ticks: 100,
      origin: { y: 1 },
    };

    setTimeout(() => {
      confetti({
        ...defaults,
        shapes: [mapMarker],
        colors: [scoreColor],
        ticks: 75,
      });
      confetti({
        ...defaults,
        shapes: [mapMarker],
        colors: [scoreColor],
        startVelocity: 90,
        origin: { y: 1.25 },
        scalar: 2,
        particleCount: particleCount * 1.5,
      });
      confetti({
        ...defaults,
        shapes: [mapMarker],
        colors: [scoreColor],
        startVelocity: 120,
        origin: { y: 1.5 },
        scalar: 1,
        ticks: 125,
        particleCount: particleCount * 3,
      });
    }, 0);
  }, []);

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
