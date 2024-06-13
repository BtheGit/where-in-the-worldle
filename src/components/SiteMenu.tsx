import "./SiteMenu.css";
import { Drawer } from "vaul";
import MapMarker from "./CustomAssets/MapMarker";

export const SiteMenuContainer = () => {
  return (
    <Drawer.Root noBodyStyles={true}>
      <Drawer.Trigger className="drawer-trigger">☰</Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="drawer-overlay" />
        <Drawer.Content className="drawer-outer">
          <div className="drawer-inner">
            <Drawer.Handle />
            <div className="drawer-content">
              <h1>Where in the Worldle</h1>
              <p style={{ textAlign: "center", fontStyle: "italic" }}>
                A daily challenge testing your ability to identify a city
                somewhere on earth from a bird's-eye view.
              </p>
              <h2>How to Play</h2>
              <p>
                For each challenge, players will have six guesses to try and
                pinpoint where in the world the secret location is. The
                objective is to pinpoint or bullseye the location in the minimum
                number of guesses.
              </p>
              <p>
                Before each guess, player's will be presented with a satellite
                photo clue of the location at decreasing zoom levels. NOTE:
                Previous clues are available to revisit during subsequent
                guesses using the carousel controls.
              </p>
              <p>
                Player's can submit a guess by placing a marker on the popout
                map and pressing submit. Previous gueses will be shown on the
                popout colored to indicate how close the guess was according to
                the following scheme:
              </p>
              <ul>
                <li>
                  <p>
                    <MapMarker fill="var(--score-primary-0)" /> Over 2000km
                    away. Are you sure you're in the right continent?
                  </p>
                </li>
                <li>
                  <p>
                    <MapMarker fill="var(--score-primary-1)" /> Within 2000km.
                    You're on the right continent!
                  </p>
                </li>
                <li>
                  <p>
                    <MapMarker fill="var(--score-primary-2)" /> Within 750km.
                    You're in the right state/province!
                  </p>
                </li>
                <li>
                  <p>
                    <MapMarker fill="var(--score-primary-3)" /> Within 50km.
                    You're in the right metropolitan region!
                  </p>
                </li>
                <li>
                  <p>
                    <MapMarker fill="var(--score-primary-4)" /> Within 2km. Good
                    enough for government work!
                  </p>
                </li>
                <li>
                  <p>
                    <MapMarker fill="var(--score-primary-5)" /> Within 100m.
                    Bullseye!{" "}
                  </p>
                </li>
              </ul>
              <p>
                NOTE: A guess within 2km miles of the secret location will count
                as correct and end the game regardless of whether it was a
                bullseye or not.
              </p>
              <h2>Tips & Tricks</h2>
              <p>
                While it may feel impossible at the beginning, there are ways to
                make the challenge a bit easier.
              </p>
              <ul className="bullet-list--awe">
                <li className="material-symbols-outlined">
                  <p>
                    Building roof types (color and material) can be a huge help.
                    A preponderance of blue roofs is often, though not
                    exclusively, associated with being in Asian countries.
                  </p>
                </li>
                <li>
                  <p>
                    If you can figure out what side of the road cars are driving
                    on (by road lines or shadows) you can eliminate half the
                    world.
                  </p>
                </li>
                <li>
                  <p>
                    While some locations may be harder than others for lack of
                    identifiable landmarks or landscapes, rest assured that
                    every city has at least a population of 100k people.
                  </p>
                </li>
                <li>
                  <p>
                    The easiest landmarks to work with are often rivers, lakes,
                    and mountain chains. By your third or fourth clue, large
                    geographical features should start being easier to spot on
                    the popout map without too much zooming in.
                  </p>
                </li>
                <li>
                  <p>
                    The quality of coverage does vary depending on what part of
                    the world you are in unfortunately. Over time, this meta
                    detail may help you recognize particular regions quite
                    quickly based on photo quality.
                  </p>
                </li>
                <li>
                  <p>
                    If you're trying to bullseye and you think you have the
                    right city, be careful, if you get a guess under 2km but
                    over 100m, you won't get another opportunity to guess again.
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <div className="drawer-footer">
            <div>
              <p>Where in the Worldle © {new Date().getFullYear()}</p>
            </div>
            <div>
              <a
                href="https://buymeacoffee.com/brendanbeltz
"
                target="_blank"
              >
                Buy me a 🌮
              </a>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default SiteMenuContainer;
