import axios from "axios";
import { useEffect, useState } from "react";
import { SERVER_URL } from "../config";

export default function useStatData() {
  const [statData, setStatData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const getInfo = async () => await axios.get(`${SERVER_URL}/api/stat`);
    getInfo().then((res) => {setStatData(res.data)});
    setLoading(false);
  }, []);
  return [statData, loading];
}
