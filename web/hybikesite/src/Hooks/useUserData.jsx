import { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";

export default function useUserData(authGet) {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const getInfo = async () => await authGet("/user");
    getInfo().then((res) => {setUserData(res.data)});
    setLoading(false);
  }, []);
  return [userData, loading];
}
