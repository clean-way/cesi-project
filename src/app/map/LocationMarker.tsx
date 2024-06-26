"use client";
import React, { useState, useEffect } from "react";
import { Marker, useMap } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Image from "next/image";

function LocationMarker({
  autoFocus,
  setGPSActivated,
  disabledForZoom
}: {
  autoFocus: boolean;
  setGPSActivated: (GPSActivated: boolean) => void;
  disabledForZoom: boolean;
}) {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const { current: map } = useMap();

  useEffect(() => {
    if (!navigator.geolocation) {
      setGPSActivated(false);
    } else {
      setGPSActivated(false);
      const watchId = navigator.geolocation.watchPosition(
        (actualPosition) => {
          setGPSActivated(true);
          const { latitude, longitude } = actualPosition.coords;

          if (!disabledForZoom) {
            if (autoFocus && position === null) {
              map!.flyTo({
                center: [longitude, latitude],
                zoom: 15,
                speed: 100,
              })
            } else if (autoFocus) {
              map!.flyTo({ center: [longitude, latitude], zoom: map?.getZoom(), speed: 1 });
            }
          }
          
          setPosition([longitude, latitude]);
        },
        (error) => {
          setGPSActivated(false);
        },
        { enableHighAccuracy: true }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, [map, autoFocus]);

  return position === null ? null : (
    <Marker longitude={position[0]} latitude={position[1]}>
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