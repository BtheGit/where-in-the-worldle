import { useState, useEffect, useRef } from "react";
import type { INewGameData, ILocation } from "../../types";
import { useHover, useFetch } from "usehooks-ts";
import LeafletEmbed from "../LeafletEmbed";
import Draggable from "react-draggable";
import Carousel from "./Carousel";
import { useChallenge } from "../../util/hooks";
import "./Game.css";
import ResultsSplash from "./ResultsSplash";

const DAILY_CHALLENGE_ENDPOINT = "/api/v1/daily-challenge";

export type IGameProps = {
  challengeId?: string;
};

export default function Game(props: IGameProps) {
  const { challengeId } = props;
  const endpoint = `/api/v1/${
    challengeId ? `challenge/${challengeId}` : "daily-challenge.json"
  }`;
  const { data, error } = useFetch(endpoint);
  // TODO: Error Screen
  // TODO: Loading Screen
  if (error) {
    return <p>Error</p>;
  } else if (!data) {
    return <p>Loading</p>;
  }
  return <Challenge challenge={data as INewGameData} />;
}

export function Challenge(props: { challenge: INewGameData }) {
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
    let timeout: NodeJS.Timeout;
    if (!isHover) {
      timeout = setTimeout(() => {
        setMapActive(isHover);
      }, 500);
    } else {
      setMapActive(isHover);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [isHover]);

  return (
    <div className="game-container">
      <div className="title-overlay-container">
        <p>Where in the Worldle?</p>
      </div>
      <div className="background-container">
        <div className="grid-lines"></div>
        <div className="background-base"></div>
      </div>
      <section className="scores-container">
        <ul>
          {challengeState.guesses.map(({ score }, i) => (
            <li className={`score score--${score}`} key={i}></li>
          ))}
        </ul>
      </section>
      <section className="clue-container">
        <Carousel
          previousGuesses={challengeState.guesses}
          images={images}
          isFinished={challengeState.isFinished}
        />
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
            challengeState={challengeState}
            position={position}
            setPosition={setPosition}
          />
          {!challengeState.isFinished && (
            <button
              disabled={position === null || challengeState.isFinished}
              className="btn--submit"
              onClick={() => {
                submitGuess(position!);
              }}
            >
              Submit
            </button>
          )}
          <div id="map_drag_handle" className="drag-handle">
            ✥
          </div>
        </section>
      </Draggable>
      {challengeState.isFinished && (
        <ResultsSplash challengeState={challengeState} date={challenge.date} />
      )}
    </div>
  );
}
