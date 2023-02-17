import React, { useEffect } from "react";
import Header from "../Components/Header";
import BikeOne from "../assets/bike1.jpg";

const powerLevels = [0, 25, 50, 75, 100];

function PowerButton({ power, settingPower, handlePowerSet }) {
  return (
    <button
      className={` rounded-md shadow-md border-gray-800 border-2 mt-1 text-white font-bold w-12 aspect-square ${
        settingPower == power ? "bg-blue-500" : "bg-gray-700"
      }`}
      onClick={() => handlePowerSet(settingPower)}
    >
      {settingPower}
    </button>
  );
}

function PowerSelector() {
  const [power, setPower] = React.useState(0);
  const handlePowerSet = (pow) => {
    if (pow < 0 || pow > 100) return;
    setPower(pow);
  };
  return (
    <div>
      <BikeInfo batteryPercentage={50} power={power} />
      <div className="flex-row flex">
        {/* <div className="flex flex-row "> */}
          {powerLevels.map((powerLevel) => (
            <PowerButton
              key={powerLevel}
              power={power}
              settingPower={powerLevel}
              handlePowerSet={handlePowerSet}
            />
          ))}
        {/* </div> */}
      </div>
    </div>
  );
}

function BikeInfo({ batteryPercentage, power }) {
  const [range, setRange] = React.useState(0);
  useEffect(() => {
    if (power == 0) return setRange("Unlimited");
    const calculatedRange = (50 / (power / 100)) * (batteryPercentage / 100);
    setRange(Math.round(calculatedRange * 10) / 10);
  }, [batteryPercentage, power]);
  return (
    <div className="flex flex-col">
      <p>Range: {range} km</p>
      <p>Battery: {batteryPercentage}%</p>
    </div>
  );
}

function BikeCard({ bike }) {
  return (
    <div className="h-40 rounded-md w-full bg-slate-300">
      <div className="flex flex-col p-5">
        <h1 className="font-semibold text-2xl">{bike.name}</h1>
        <PowerSelector />
      </div>
    </div>
  );
}

function LoyaltyCard({ points }) {
  return (
    <div className="h-40 rounded-md w-full bg-slate-300">
      <div className="flex flex-col p-5">
        <h1 className="font-semibold text-xl">Your Credits</h1>
        <p className="font-semibold">Points: {points}</p>
      </div>
    </div>
  );
}

function Main() {
  return (
    <div className="w-full h-auto flex flex-col items-center justify-start bg-slate-800 min-h-screen">
      <Header />
      <div className="flex flex-col w-full container px-5 mt-4">
        <div className="grid grid-cols-1 sm:grid-rows-1 sm:grid-cols-2 gap-3 mb-3">
          <LoyaltyCard points={100} />
          <LoyaltyCard points={100} />
        </div>
        <div className="flex flex-col w-full container p-3 sm:px-8 bg-gray-900 rounded-md shadow-md">
          <h1 className="text-white font-bold text-3xl m-3">My Hybikes</h1>
          <BikeCard bike={{ name: "Main Bike" }} />
        </div>
      </div>
    </div>
  );
}

export default Main;
