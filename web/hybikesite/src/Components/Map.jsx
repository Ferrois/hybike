import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import useStatData from "../Hooks/useStatData";
import StationLayer from "./StationLayer";

delete L.Icon.Default.prototype._getIconUrl;

function Map() {
  const [statData, loading] = useStatData();

  return (
    <>
      <MapContainer
        center={[1.3521, 103.9198]}
        zoom={15}
        scrollWheelZoom={true}
        className="w-full h-full"
        attributionControl={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <StationLayer statData={statData} />
      </MapContainer>
    </>
  );
}

export default Map;
