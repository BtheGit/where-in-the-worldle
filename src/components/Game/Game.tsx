import { useState, useEffect, useRef, BaseSyntheticEvent } from "react";
import { getRandomLocation } from "../../util/location";
import { getStaticUrl } from "../../util/mapbox";
import type { ILocationGuess, INewGameData } from "../../types";
import { useHover } from "usehooks-ts";
import LeafletEmbed from "../LeafletEmbed";
import Draggable from "react-draggable";
import Carousel from "./Carousel";
import "./Game.css";

// TODO TOMORROW: Change submit approach to basic button.
// Calculate score, update Previous guesses.
// Probably will need to abstract further to make a subset component that reloads based on previousGuesses.

export default function Game() {
  const [gameData, setGameData] = useState<INewGameData | null>(null);
  useEffect(() => {
    const getGameData = async () => {
      const location = await getRandomLocation(10);
      console.log(location);
      const ZOOM_LEVELS = [15.5, 14, 12, 10, 8, 6.5, 3];
      const { lat, lng } = location;
      const images = ZOOM_LEVELS.map((zoom) =>
        getStaticUrl({ lat, lng, zoom })
      );
      const gameData: INewGameData = { location, images };
      setGameData(gameData);
    };
    getGameData();
  }, []);
  if (!gameData) {
    return <p>Loading</p>;
  }
  return <GameScreen gameData={gameData} />;
}

export function GameScreen(props: { gameData: INewGameData }) {
  const { gameData } = props;
  const mapContainerRef = useRef(null);
  const isHover = useHover(mapContainerRef);
  // const guess = useFetcher();
  // const newGameData: INewGameData = loader();
  const { location, images } = gameData;
  const { lat, lng, id: locationId } = location;
  const [position, setPosition] = useState<null | { lat: number; lng: number }>(
    null
  );
  const [mapActive, setMapActive] = useState(false);
  const [previousGuesses, setPreviousGuesses] = useState(
    [] as ILocationGuess[]
  );
  const onGuessSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    console.log(e);
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
  // TODO: Replace with call to game.guess
  // useEffect(() => {
  //   if (guess.type === "done" && guess.data.distance) {
  //     const distance: number = guess.data.distance;
  //     console.log(guess);
  //     if (distance >= 1000) {
  //       console.log(
  //         Math.round((distance / 1000 + Number.EPSILON) * 10) / 10 + "km"
  //       );
  //     } else {
  //       console.log(Math.round(distance) + "m");
  //     }
  //     // https://overreacted.io/a-complete-guide-to-useeffect/#making-effects-self-sufficient
  //     setPreviousGuesses((p) => [...p, { ...guess.data }]);
  //   }
  // }, [guess]);

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
          <form onSubmit={onGuessSubmit}>
            <input type="hidden" name="locationId" value={locationId} />
            {/* https://thewebdev.info/2021/09/18/how-to-fix-the-a-component-is-changing-an-uncontrolled-input-of-type-text-to-be-controlled-error-in-react/ */}
            <input type="hidden" name="lat" value={position?.lat || 0} />
            <input type="hidden" name="lng" value={position?.lng || 0} />
            <button
              type="submit"
              disabled={position === null}
              className="btn--submit"
            >
              Submit
            </button>
          </form>
          <div id="map_drag_handle" className="drag-handle">
            ✥
          </div>
        </section>
      </Draggable>
    </>
  );
}
