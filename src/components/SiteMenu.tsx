import "./SiteMenu.css";
import { Drawer } from "vaul";

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
              <p>
                A daily challenge testing your ability to identify a city
                somewhere on earth from a bird's-eye view.
              </p>
              <h2>How to Play</h2>
              <p>
                For each challenge, players will have six guesses to try and
                pinpoint where in the world the secret location is.
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
              <p>Red: More than 2000km away from the secret location.</p>
              <p>Orange: Within 2000km</p>
              <p>Yellow: Within 750km</p>
              <p>Light Green: Within 50km</p>
              <p>Dark Green: Within 2km. Good enough for government work!</p>
              <p>Purple: Within 100m. Bullseye! </p>
              <p>
                NOTE: A guess within 2km miles of the secret location will count
                as correct and end the game regardless of whether it was a
                bullseye or not.
              </p>
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
