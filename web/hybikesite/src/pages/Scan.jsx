import React, { useState } from "react";
import { toast } from "react-toastify";
import Header from "../Components/Header";
import { Modal } from "../Components/Modal";
import { Scanner } from "../Components/Scanner";
import { useAuth } from "../Context/AuthContext";

function Scan() {
  const { authPost } = useAuth();
  const [stationId, setStationId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await authPost(`/user/usestation`, { stationId: stationId });
      toast(res.data.message, { type: "success" });
    } catch (err) {
      toast(err.response.data.message, { type: "error" });
    }
  };

  const handleScan = (station) => {
    setShowModal(true);
    setStationId(station);
  };
  return (
    <>
      <div className="w-screen h-screen flex flex-col items-center justify-start">
        <Header />
        <div>
          {/* <div>Swap Wattainables</div>
        <form>
          <input
            type="text"
            placeholder="Input Station Id"
            onChange={(e) => setStationId(e.target.value)}
            value={stationId}
          />
          <button type="submit" onClick={(e) => handleSubmit(e)}>
            Submit
          </button> */}
          <Scanner handleScan={handleScan}/>

        </div>
        <Modal showModal={showModal} setShowModal={setShowModal}>
          <div>{stationId}</div>
          <div><form><button type="submit" onClick={(e)=>handleSubmit(e)}>Authorise & Unlock</button></form></div>
        </Modal>
      </div>
    </>
  );
}

export default Scan;
