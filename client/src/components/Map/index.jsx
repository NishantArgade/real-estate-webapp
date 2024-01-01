import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import GeoCoderMarker from "../GeoCoderMarker";
import "./Map.css";

const Map = ({ address, city, country }) => {
  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={1}
      scrollWheelZoom={false}
      style={{
        height: "40vh",
        width: "100%",
        marginTop: "20px",
        zIndex: 0,
      }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <GeoCoderMarker address={`${address} ${city} ${country}`} />
    </MapContainer>
  );
};

export default Map;
