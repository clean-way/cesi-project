"use client";
import React, { useState } from "react";
import ReactMapGL, { NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import LocationMarker from "./LocationMarker";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoidGhlby10cnV2ZWxvdCIsImEiOiJjbHVncXUzcHUyYnhuMnFuaWw0Z3k1NHAxIn0.uG3H-9gH1RC7r5QyAEwxEA"; // Remplacez par votre propre token Mapbox

function MapPage() {
  const [viewState, setviewState] = useState({
    latitude: 48.866667,
    longitude: 2.333333,
    zoom: 13,
  });
  const [autoFocus, setAutoFocus] = useState(true);
  const [GPSActivated, setGPSActivated] = useState(true);

  const handleRecenter = () => {
    setAutoFocus(true);
  };

  return (
    <div style={{ height: "100vh", width: "100%", position: "relative" }}>
      <ReactMapGL
        {...viewState}
        onMove={(evt) => setviewState(evt.viewState as any)}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        <div style={{ position: "absolute", right: 10, top: 10 }}>
          <NavigationControl />
        </div>
        <LocationMarker autoFocus={autoFocus} setAutoFocus={setAutoFocus} GPSActivated={GPSActivated} setGPSActivated={setGPSActivated} />
      </ReactMapGL>
      {!autoFocus && (
        <button
          onClick={handleRecenter}
          style={{
            position: "absolute",
            bottom: 30,
            right: 10,
            padding: "10px",
            background: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
            zIndex: 1000,
          }}
        >
          Recenter
        </button>
      )}
      {
        GPSActivated ? null : (
          <div className="absolute h-full w-full bg-black bg-opacity-50 z-[100] top-0 left-0">
          <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white"
          >
            <p>Veuillez activer la géolocalisation pour utiliser cette fonctionnalité.</p>
          </div>
          </div>
        )
      }
    </div>
  );
}

export default MapPage;
