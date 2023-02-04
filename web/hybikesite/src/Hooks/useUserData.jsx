import { useEffect, useState } from "react";

export default function useUserData(authGet,accessToken) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const getInfo = async () => await authGet("/user");
    getInfo().then((res) => {setUserData(res.data)}).catch(()=>setUserData(null));
    setLoading(false);
  }, [accessToken]);
  return [userData, loading];
}
