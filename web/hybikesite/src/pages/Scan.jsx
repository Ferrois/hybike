import React, { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "../Components/Button";
import Header from "../Components/Header";
import { Input } from "../Components/Input";
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
      <div className="w-full min-h-screen flex flex-col items-center justify-start bg-slate-700 text-white">
        <Header />
        <h1>Scan the QR Code of the kiosk</h1>
        <div className="container flex items-center justify-center">
          <Scanner handleScan={handleScan} />
        </div>
        <div className="mb-2">
          <h1>Alternatively, Input Station ID:</h1>
          <form>
            <Input
              value={stationId}
              onChange={(e) => {
                setStationId(e.target.value);
              }}
            />
            <Button type="submit" onClick={(e) => handleSubmit(e)}>
              Unlock
            </Button>
          </form>
        </div>
        <Modal showModal={showModal} setShowModal={setShowModal}>
          <div>{stationId}</div>
          <div>
            <form>
              <Button type="submit" onClick={(e) => handleSubmit(e)}>
                Authorise & Unlock
              </Button>
            </form>
          </div>
        </Modal>
      </div>
    </>
  );
}

export default Scan;
