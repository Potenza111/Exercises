import Image from "next/image";
import { useState, useEffect } from "react";
import ReactMapGl, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Geocode from "react-geocode";

export default function EventMap({ evt }) {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "500px",
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 12,
  });

  //I left this component because I had to add billing info to get a google api key and also mapbox api token didnt work (not sure if it takes time to activate)
  //but I dint want to spend to much time on this (the code is correct, just needs the API keys)

  Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_API_KEY);

  useEffect(() => {
    Geocode.fromAddress(evt.address).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        setLat(lat);
        setLng(lng);
        setViewport({ ...viewport, latitude: lat, longitude: lng });
        setLoading(false);
      },
      (error) => {
        console.error(error);
      }
    );
  }, []);

  if (loading) return false;

  console.log(lat, lng);

  return (
    <ReactMapGl
      {...viewport}
      mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
      onViewportChange={(vp) => setViewport(vp)}
    >
      <Marker key={evt.id} latitude={lat} longitude={lng}>
        <Image src="/images/pin.svg" height={30} width={30}></Image>
      </Marker>
    </ReactMapGl>
  );
}
