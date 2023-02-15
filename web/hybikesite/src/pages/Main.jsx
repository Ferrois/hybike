import React from "react";
import Header from "../Components/Header";
import BikeOne from "../assets/bike1.jpg";

function Main() {
  return (
    <div className="w-screen h-auto flex flex-col items-center justify-start">
      <Header />
      <div className="flex flex-col bg-gray-200 w-full h- lg:max-w-5xl">
        <div className="flex flex-col h-screen p-4">
          <h1 className="text-3xl lg:text-5xl"><span className="text-orange-500">Gold</span> Era Of Transport.</h1>
          <h3>Hybike is a modern solution for a car-lite Singapore</h3>
        </div>
        <div className="grid grid-cols-2 h-64 pt-4">
          <div className="bg-gray-500">
            <img src={BikeOne} className="object-cover h-full"></img>
          </div>
          <div className="bg-gray-400">
            <main></main>
          </div>
        </div>
        <div className="grid grid-cols-2 h-64 pt-4">
          <div className="bg-gray-400">hero2</div>
          <div className="bg-gray-500">
            <main></main>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
