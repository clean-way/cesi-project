"use client";
import React, { useState } from "react";
import ReactMapGL, { Marker, NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import LocationMarker from "./LocationMarker";
import NewSpot from "./NewSpot";
import TrashMarkers from "./TrashMarkers";
import { Button } from "@/components/ui/button";
import { Spot } from "@prisma/client";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

function MapPage() {
  const [viewState, setviewState] = useState({
    latitude: 48.866667,
    longitude: 2.333333,
    zoom: 13,
  });
  const [autoFocus, setAutoFocus] = useState(true);
  const [GPSActivated, setGPSActivated] = useState(true);
  const [disabledForZoom, setDisabledForZoom] = useState(false);
  const [screenPosition, setScreenPosition] = useState<[number, number] | null>(null);
  const [userPosition, setUserPosition] = useState<[number, number] | null>(null);
  const [trash, setTrash] = useState([] as Spot[]);

  const handleRecenter = () => {
    setAutoFocus(true);
  };

  return (
    <div className="h-[calc(100dvh-4rem)] w-screen relative">
      <ReactMapGL reuseMaps
        {...viewState}
        onMove={(evt) => setviewState(evt.viewState as any)}
        onMoveEnd={(evt) => setScreenPosition([evt.viewState.longitude, evt.viewState.latitude])}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={MAPBOX_TOKEN}
        maxZoom={20}
        minZoom={14}
        pitch={0}
        onDrag={() => setAutoFocus(false)}
        onZoomStart={() => setDisabledForZoom(true)}
        onZoomEnd={() => setDisabledForZoom(false)}
      >
          <NavigationControl position="top-right" />
        <LocationMarker
          autoFocus={autoFocus}
          setGPSActivated={setGPSActivated}
          disabledForZoom={disabledForZoom}
          userPosition={userPosition}
          setUserPosition={setUserPosition}
        />
        {screenPosition && (
          <TrashMarkers
            longitude={screenPosition[0]}
            latitude={screenPosition[1]}
            setTrash={setTrash}
            trash={trash}
          />
        )}
      </ReactMapGL>
      {!autoFocus && (
        <Button className="absolute top-2 right-12" variant={"secondary"} onClick={handleRecenter}>Recenter</Button>
      )}
      <NewSpot position={userPosition} trash={trash} setTrash={setTrash} />
      {GPSActivated ? null : (
        <div className="absolute h-full w-full bg-black bg-opacity-50 z-[100] top-0 left-0">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
            <p>
              Veuillez activer la géolocalisation pour utiliser cette
              fonctionnalité.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default MapPage;
