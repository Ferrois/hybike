import React from "react";
import StationMarker from "./StationMarker";

function StationLayer({ statData }) {
  return <>{statData && statData.map((stat) => <StationMarker {...stat} />)}</>;
}

export default StationLayer;
