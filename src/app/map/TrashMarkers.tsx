"use client";
import React, { useState, useEffect } from "react";
import { Marker, useMap } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Image from "next/image";
import { Spot } from "@prisma/client";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button";

function TrashMarkers() {
    const { current: map } = useMap();

    const [trash, setTrash] = useState([] as Spot[]);
    
    useEffect(() => {
        fetch(`/api/spot?longitude=${map?.getCenter().lng}&latitude=${map?.getCenter().lat}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
        });
    }, []);
    
    return (
        <>
        {trash.map((t) => (
            <Marker key={t.id} latitude={t.latitude} longitude={t.longitude} onClick={() => map?.flyTo({ center: [t.longitude, t.latitude], zoom: 20 })

            } style={{ cursor: "pointer" }}>
            <Drawer>
            <DrawerTrigger><Image src="/trash.webp" width={32} height={32} alt="Trash icon" /></DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                <DrawerTitle>Trash</DrawerTitle>
                <DrawerDescription>{t.description}</DrawerDescription>
                <div>{t.access}</div>
                </DrawerHeader>
                <DrawerFooter>
                <Button>Submit</Button>
                <DrawerClose>
                    <Button variant="outline">Cancel</Button>
                </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
            </Drawer>
            </Marker>
        ))}
        </>
    );

}

export default TrashMarkers;