import React, { useState } from "react";
import { toast } from "react-toastify";
import Header from "../Components/Header";
import { useAuth } from "../Context/AuthContext";

function Scan() {
  const { authPost } = useAuth();
  const [stationId, setStationId] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const stationId = e.target[0].value;
    try {
      const res = await authPost(`/user/usestation`, { stationId: stationId });
      toast(res.data.message, { type: "success" });
    } catch (err) {
      toast(err.response.data.message, { type: "error" })
    }
  };
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-start">
      <Header />
      <div>
        <div>Swap Wattainables</div>
        <form>
          <input
            type="text"
            placeholder="Input Station Id"
            onChange={(e) => setStationId(e.target.value)}
            value={stationId}
          />
          <button type="submit" onClick={(e) => handleSubmit(e)}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Scan;
