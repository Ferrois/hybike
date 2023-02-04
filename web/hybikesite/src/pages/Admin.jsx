import React, { useState } from "react";
import Header from "../Components/Header";
import { useAuth } from "../Context/AuthContext";
import useStatData from "../Hooks/useStatData";

function StationCard({ id, name, count, capacity }) {
  const { authPost } = useAuth();
  const [newcount, setNewcount] = useState(count);
  const handleModifyStation = async (e) => {
    e.preventDefault();
    try {
      const res = await authPost(`/admin/modifystat`, {
        stationId: id,
        count: count,
      });
      toast(res.data.message, { type: "success" });
    } catch (err) {
      toast(err.response.data.message, { type: "error" });
    }
  };
  return (
    <div className=" bg-gray-100">
      <div>{name}</div>
      <div>
        {count}/{capacity}
      </div>
      <form>
        <input
          type="digit"
          value={newcount}
          onChange={(e) => setNewcount(e.target.value)}
        />
        <button type="submit" onClick={(e) => handleModifyStation(e)} >Modify</button>
      </form>
    </div>
  );
}

function Admin() {
  const [statData] = useStatData();
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-start">
      <Header />
      <div>Admin Page</div>
      {statData && statData.map((station) => <StationCard {...station} />)}
    </div>
  );
}

export default Admin;
