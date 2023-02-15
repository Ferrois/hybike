import React from "react";
import { Marker, Popup } from "react-leaflet";
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
      <AiFillCaretDown size={15} />
    </div>
  );
}

function StationDisplay({ id, name, count, capacity, loc }) {
  return (
    <Popup>
      <div className="flex flex-col">
        <div className="text-lg font-bold">{name}</div>
        <div className="text-xs">Station Id: {id}</div>
        <div className="flex flex-row justify-evenly">
          <div className="flex flex-col">
            <div className="text-sm">Available{" "}</div>
            <div className="text-sm">Capacity{" "}</div>
          </div>
          <div className="flex flex-col">
            <div className="text-sm">{count}</div>
            <div className="text-sm">{capacity}</div>
          </div>
        </div>
      </div>
    </Popup>
  );
}

function StationMarker(props) {
  const iconHTML = ReactDOMServer.renderToString(<MarkerIcon />);
  const customMarkerIcon = new L.DivIcon({ html: iconHTML });
  return (
    <Marker position={props.loc} icon={customMarkerIcon}>
      <StationDisplay {...props} />
    </Marker>
  );
}

export default StationMarker;
