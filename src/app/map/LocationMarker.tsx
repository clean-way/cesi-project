"use client";
import React, { useState, useEffect } from "react";
import { Marker, useMap } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Image from "next/image";

function LocationMarker({
  autoFocus,
  setGPSActivated,
  disabledForZoom,
  userPosition,
  setUserPosition,
}: {
  autoFocus: boolean;
  setGPSActivated: (GPSActivated: boolean) => void;
  disabledForZoom: boolean;
  userPosition: [number, number] | null;
  setUserPosition: (position: [number, number] | null) => void;
}) {
  const { current: map } = useMap();

  useEffect(() => {
    if (!navigator.geolocation) {
      setGPSActivated(false);
    } else {
      const watchId = navigator.geolocation.watchPosition(
        (actualPosition) => {
          setGPSActivated(true);
          const { latitude, longitude } = actualPosition.coords;
          setUserPosition([longitude, latitude]);

          if (!disabledForZoom) {
            if (autoFocus && userPosition === null) {
              map!.flyTo({
                center: [longitude, latitude],
                zoom: map?.getZoom(),
                animate: false,
              })
            } else if (autoFocus) {
              map!.flyTo({ center: [longitude, latitude], zoom: map?.getZoom(), speed: 1 });
            }
          }
          
        },
        (error) => {
          setGPSActivated(false);
        },
        { enableHighAccuracy: true }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, [map, autoFocus]);

  return userPosition === null ? null : (
    <Marker longitude={userPosition[0]} latitude={userPosition[1]}>
      <Image
        src="/user.png"
        alt="User Marker"
        width={40}
        height={40}
      />
    </Marker>
  );
}

export default LocationMarker;