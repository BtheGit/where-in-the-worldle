import { useState, useEffect, useRef } from "react";
import type { ILocationGuess, INewGameData } from "../../types";
import { useHover } from "usehooks-ts";
import LeafletEmbed from "../LeafletEmbed";
import Draggable from "react-draggable";
import Carousel from "./Carousel";
import { calculateDistance, calculateScore } from "../../util/challenge";
import "./Game.css";

// Probably will need to abstract further to make a subset component that reloads based on previousGuesses.
// Code challenge by id. Persist to local storage.

export default function Game(props: { challenge: INewGameData }) {
  const { challenge } = props;
  const mapContainerRef = useRef(null);
  const isHover = useHover(mapContainerRef);
  // const guess = useFetcher();
  // const newGameData: INewGameData = loader();
  const { location, images } = challenge;
  const [position, setPosition] = useState<null | { lat: number; lng: number }>(
    null
  );
  const [mapActive, setMapActive] = useState(false);
  const [previousGuesses, setPreviousGuesses] = useState(
    [] as ILocationGuess[]
  );
  const onGuessSubmit = () => {
    const distance = calculateDistance(location, position!);
    const score = calculateScore(100, distance);
    if (distance >= 1000) {
      console.debug(
        Math.round((distance / 1000 + Number.EPSILON) * 10) / 10 + "km"
      );
    } else {
      console.debug(Math.round(distance) + "m");
    }
    // https://overreacted.io/a-complete-guide-to-useeffect/#making-effects-self-sufficient
    setPreviousGuesses((p) => [...p, { ...position!, score, distance }]);
  };
  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (
        (mapContainerRef?.current! as HTMLElement).contains(
          e.target as HTMLElement
        )
      ) {
        setMapActive(true);
      } else {
        setMapActive(false);
      }
    });
  }, []);
  useEffect(() => {
    setMapActive(isHover);
  }, [isHover]);

  return (
    <>
      <section className="scores-container">
        <ul>
          {previousGuesses.map(({ score }, i) => (
            <li className={`score score--${score}`} key={i}></li>
          ))}
        </ul>
      </section>
      <section className="clue-container">
        <Carousel previousGuesses={previousGuesses} images={images} />
      </section>
      <Draggable bounds="body" handle="#map_drag_handle">
        {/* Bounds = body prevents the minimized map from falling offscreen on shrinking action */}
        <section
          className={`map-container ${
            mapActive ? "map-container--active" : ""
          }`}
          ref={mapContainerRef}
        >
          {/* The starting Location is messed up by the map sizing anyway. */}
          <LeafletEmbed
            startingLocation={{
              lat: position?.lat || 0,
              lng: position?.lng || 0,
            }}
            previousGuesses={previousGuesses}
            position={position}
            setPosition={setPosition}
          />
          <button
            disabled={position === null}
            className="btn--submit"
            onClick={onGuessSubmit}
          >
            Submit
          </button>

          <div id="map_drag_handle" className="drag-handle">
            ✥
          </div>
        </section>
      </Draggable>
    </>
  );
}
