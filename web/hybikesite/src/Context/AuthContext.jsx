import axios from "axios";
import { useContext, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "../config";
import useLocalStorage from "../Hooks/useLocalStorage";
import useUserData from "../Hooks/useUserData";

const Context = createContext(null);

export function useAuth() {
  return useContext(Context);
}

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  // Handle sign ups
  const signup = (username, password) => {
    return axios.post(`${SERVER_URL}/auth/signup`, { username, password });
  };

  // Handle logins
  const login = async (username, password) => {
    const loginRes = await axios.post(`${SERVER_URL}/auth/login`, {
      username,
      password,
    });

    setAccessToken(loginRes.data.accessToken);
    navigate("/view");
    return loginRes;
  };

  // Handle authenticated GET requests
  const authGet = (url, options) => {
    if (!accessToken) {
      throw new Error("No access token");
    }
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken || ""}`,
    };
    return axios.get(`${SERVER_URL}${url}`, { headers, ...options });
  };

  const [userData] = useUserData(authGet)
  const [accessToken, setAccessToken] = useLocalStorage("accessToken", null);

  return (
    <Context.Provider value={{ signup, login, authGet, userData }}>
      {children}
    </Context.Provider>
  );
}
