import React from "react";
import Header from "../Components/Header";
import BikeOne from "../assets/bike1.jpg";
import BikeImg from "../assets/bike0.png";

function LandingPage() {
  return (
    <div className="w-full h-auto flex flex-col items-center justify-start overflow-y-hidden bg-gray-200">
      <Header />
      <div className="flex flex-col w-full lg:max-w-5xl">
        <div className="flex flex-col h-1/2 p-4">
          <h1 className="text-3xl lg:text-5xl">
            <span className="text-yellow-500 font-bold">Gold</span> Era Of Transport.
          </h1>
          <h3>Hybike is a modern solution for a car-lite Singapore</h3>
        </div>
        <div className="grid grid-cols-2 h-72 pt-4 rounded-md overflow-hidden">
          <div className="bg-gray-500">
            <img src={BikeOne} className="object-cover h-full"></img>
          </div>
          <div className="bg-gray-400">
            <main></main>
          </div>
        </div>
        <div className="grid grid-cols-2 h-72 pt-4 rounded-md overflow-hidden mb-10">
          <div className="bg-gray-400">hero2</div>
          <div className="bg-gray-500">
            <main></main>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
