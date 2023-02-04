import React from "react";
import Header from "../Components/Header";
import Map from "../Components/Map";
import { useAuth } from "../Context/AuthContext";

export function View() {
  const {userData} = useAuth();
  return (
    <div className="w-screen h-screen flex flex-col justify-start">
      <Header/>
        <div className="flex-grow w-full"><Map/></div>
        {JSON.stringify(userData)}
    </div>
  );
}

