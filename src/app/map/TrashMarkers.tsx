"use client";
import React, { useState, useEffect } from "react";
import { Marker, useMap } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Image from "next/image";
import { Prisma, Spot } from "@prisma/client";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import SpotDetails from "./SpotDetails";

type SpotWithTrash = Prisma.SpotGetPayload<{
  include: { spotTrash: { include: { trash: true } } };
}>;

function TrashMarkers({
  longitude,
  latitude,
  setTrash,
  trash,
}: {
  longitude: number;
  latitude: number;
  setTrash: (trash: Spot[]) => void;
  trash: Spot[];
}) {
  const { current: map } = useMap();
  const [trashData, setTrashData] = useState(null as SpotWithTrash | null);

  useEffect(() => {
    fetch(`/api/spot?longitude=${longitude}&latitude=${latitude}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.spots) {
          setTrash(data.spots);
        }
      });
  }, [longitude, latitude]);

  const handleMarkerClick = (spot: Spot) => {
    console.log(spot.completeCleaningAt);
    map?.flyTo({ center: [spot.longitude, spot.latitude], zoom: map?.getZoom() });
    fetch(`/api/spot/${spot.id}`)
        .then((res) => res.json())
        .then((data) => {
            if (data.spot) {
            setTrashData(data.spot);
            }
        });
  };

  return (
    <>
      {trash.map((t) => (
        <Marker
          key={t.id}
          latitude={t.latitude}
          longitude={t.longitude}
          onClick={() => handleMarkerClick(t)}
          style={{ cursor: "pointer" }}
        >
          <Drawer>
            <DrawerTrigger
              onClick={() => handleMarkerClick(t)}
              >
              {t.completeCleaningAt ? (
                <Image
                src="/picked_trash.png"
                width={32}
                height={32}
                alt="Trash icon"
              />
              ) : (
                <Image
                src="/unpicked_trash.png"
                width={32}
                height={32}
                alt="Trash icon"
              />
              )
              }
            </DrawerTrigger>
            {trashData && <SpotDetails spot={trashData} setSpot={setTrashData} />}
          </Drawer>
        </Marker>
      ))}
    </>
  );
}

export default TrashMarkers;
