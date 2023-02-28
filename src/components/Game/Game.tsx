import { useState, useEffect, useRef } from "react";
import type { INewGameData, ILocation } from "../../types";
import { useHover } from "usehooks-ts";
import LeafletEmbed from "../LeafletEmbed";
import Draggable from "react-draggable";
import Carousel from "./Carousel";
import { useChallenge } from "../../util/hooks";
import "./Game.css";

export default function Game(props: { challenge: INewGameData }) {
  const mapContainerRef = useRef(null);
  const isHover = useHover(mapContainerRef);
  const { challenge } = props;
  const { images } = challenge;
  const [challengeState, submitGuess] = useChallenge(challenge);
  const [position, setPosition] = useState<null | ILocation>(null);
  const [mapActive, setMapActive] = useState(false);
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
          {challengeState.guesses.map(({ score }, i) => (
            <li className={`score score--${score}`} key={i}></li>
          ))}
        </ul>
      </section>
      <section className="clue-container">
        <Carousel previousGuesses={challengeState.guesses} images={images} />
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
            previousGuesses={challengeState.guesses}
            position={position}
            setPosition={setPosition}
          />
          <button
            disabled={position === null || challengeState.isFinished}
            className="btn--submit"
            onClick={() => {
              submitGuess(position!);
            }}
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
