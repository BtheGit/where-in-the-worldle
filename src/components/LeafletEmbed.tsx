import L from "leaflet";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import type { ILocationGuess, IGameState } from "../types";

// TODO: Protect key: https://documentation.maptiler.com/hc/en-us/articles/360020806037-Protect-your-map-key
const MAPTILER_KEY =
  import.meta.env.PUBLIC_MAPTILER_KEY || process.env.PUBLIC_MAPTILER_KEY;

//https://react-leaflet.js.org/docs/start-introduction/

export type LeafetEmbedProps = {
  startingLocation: { lat: number; lng: number };
  challengeState: IGameState;
};

export type LocationMarkerProps = {
  position: null | { lat: number; lng: number };
  setPosition: React.Dispatch<
    React.SetStateAction<{
      lat: number;
      lng: number;
    } | null>
  >;
};

export function LocationMarker({ position, setPosition }: LocationMarkerProps) {
  useMapEvents({
    click(e) {
      setPosition({ ...e.latlng });
    },
  });

  return position === null ? null : (
    <Marker position={position} icon={customMarkerIcon("")}></Marker>
  );
}

export function customMarkerIcon(customClass?: string) {
  const svgTemplate = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" class="marker">
      <path fill-opacity=".25" d="M16 32s1.427-9.585 3.761-12.025c4.595-4.805 8.685-.99 8.685-.99s4.044 3.964-.526 8.743C25.514 30.245 16 32 16 32z"/>
      <path class="marker-inner" fill="#fff" stroke="#fff" d="M15.938 32S6 17.938 6 11.938C6 .125 15.938 0 15.938 0S26 .125 26 11.875C26 18.062 15.938 32 15.938 32zM16 6a4 4 0 100 8 4 4 0 000-8z"/>
    </svg>`;

  return new L.DivIcon({
    className: `marker-container ${customClass}`,
    html: svgTemplate,
    iconSize: [40, 40],
    iconAnchor: [12, 24],
    popupAnchor: [7, -16],
  });
}

// https://github.com/PaulLeCam/react-leaflet/issues/340
const handleMapResize = (map: L.Map) => {
  const resizeObserver = new ResizeObserver(() => {
    map.invalidateSize();
  });
  const container = document.getElementById("leaflet_container")!;
  resizeObserver.observe(container);
};

export default function LeafletEmbed({
  startingLocation,
  challengeState,
  position,
  setPosition,
}: LeafetEmbedProps & LocationMarkerProps) {
  const { lng, lat } = startingLocation;
  // NOTE: Center is still not behaving as hoped for (not recentering after guess`)
  return (
    <MapContainer
      id="leaflet_container"
      className="embed-container"
      center={
        challengeState.isFinished
          ? [challengeState.location.lat, challengeState.location.lng]
          : [lat, lng]
      }
      zoom={2}
      attributionControl={true}
      ref={(map: L.Map | null) => {
        // https://github.com/PaulLeCam/react-leaflet/issues/974
        // Change to accomodate deprecated whenCreated method
        if (map) {
          handleMapResize(map);
        }
      }}
    >
      {/* <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      /> */}
      <TileLayer
        attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OSM contribs</a>'
        url={`https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=${MAPTILER_KEY}`}
      />
      {challengeState.guesses.map((guess, i) => {
        const { lat, lng, score } = guess;
        return (
          <Marker
            key={i}
            position={{ lat, lng }}
            icon={customMarkerIcon(`score--${score}`)}
          ></Marker>
        );
      })}
      {challengeState.isFinished && (
        <Marker position={challengeState.location}></Marker>
      )}
      {!challengeState.isFinished && (
        <LocationMarker position={position} setPosition={setPosition} />
      )}
    </MapContainer>
  );
}
