import React from "react";
import Map from "../Components/Map";

export function View() {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
        <div className="w-1/2 aspect-video"><Map/></div>
      
    </div>
  );
}

