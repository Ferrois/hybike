import React from "react";
import { Marker } from "react-leaflet";
import L from "leaflet";
import ReactDOMServer from "react-dom/server";
import { RiChargingPileFill } from "react-icons/ri";
import { AiFillCaretDown } from "react-icons/ai";

function MarkerIcon() {
  return (
    <div className="flex flex-col items-center">
      <div className="p-1 rounded-lg bg-green-400 border-2 border-black flex items-center justify-center">
        <div className="aspect-square flex justify-center items-center">
          <RiChargingPileFill size={15} className="" />
        </div>
      </div>
      <AiFillCaretDown size={15}/>
    </div>
  );
}

function StationMarker({ name, count, capacity, loc }) {
  const iconHTML = ReactDOMServer.renderToString(<MarkerIcon />);
  const customMarkerIcon = new L.DivIcon({ html: iconHTML });
  return (
    // <div className="flex flex-col bg-slate-600">
    //   <h2>{name}</h2>
    //   <p>{count}/{capacity}</p>
    // </div>
    <Marker position={loc} icon={customMarkerIcon}></Marker>
  );
}

export default StationMarker;
