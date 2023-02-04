import React from "react";
import StationMarker from "./StationMarker";

function StationLayer({ statData }) {
  return <>{statData && statData.map((stat) => <StationMarker key={stat.id} {...stat} />)}</>;
}

export default StationLayer;
