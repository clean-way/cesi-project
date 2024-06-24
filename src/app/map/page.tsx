"use client";
import React, { useState, useEffect } from "react";
import Map, { NavigationControl, Marker, GeolocateControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { isMobile } from "react-device-detect";
import classes from "./Page.module.css";

interface UserLocation {
    latitude: number;
    longitude: number;
  }
  


export default function Home() {
    const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

    //get location from browser
    const [viewport, setViewport] = useState({
        latitude: 0,
        longitude: 0,
        zoom: 1,
    });
    const [userLocation, setUserLocation] = useState<UserLocation | null>(null);

    const [permissions, setPermissions] = useState(
        {
            geolocalisation: "waiting",
        }
    );

        
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(success, error);
        navigator.permissions.query({ name: "geolocation" }).then(function (result) {
            
        });
    });

    function success(position: GeolocationPosition) {
        setPermissions({
            geolocalisation: "granted",
        });
        setViewport({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            zoom: 8,
        });
        //click on GeolocateControl
        const geolocateControl = document.querySelector(".mapboxgl-ctrl-geolocate");
    }

    function error() {
        setPermissions({
            geolocalisation: "denied",
        });
    }

    return (
        <main className={classes.mainStyle}>
            <h1>Map</h1>
            <h1>{permissions.geolocalisation}</h1>
            {permissions.geolocalisation === "denied" && (
                <p>
                    You have denied the geolocalisation. Please allow it in your browser settings.
                </p>

            )
                || permissions.geolocalisation === "prompt" && (
                    <p>
                        Please allow geolocalisation to see your location.
                    </p>
                )
                || permissions.geolocalisation === "granted" && (
                    <Map
                        initialViewState={viewport}
                        mapboxAccessToken={mapboxToken}
                        mapStyle="mapbox://styles/mapbox/streets-v12"
                        maxZoom={20}
                        minZoom={7}
                        interactive={true}
                        //tracking user location        
                    >

                        <GeolocateControl
                            trackUserLocation={true}
                            positionOptions={{ enableHighAccuracy: true }}
                        />
                        <NavigationControl position="top-left" />
                    </Map>
                )
                || permissions.geolocalisation === "waiting" && (
                    <p>
                        Waiting for geolocalisation...
                    </p>
                )
            }

        </main>
    );
}
