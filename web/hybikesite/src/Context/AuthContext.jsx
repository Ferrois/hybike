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
  const signup = async (username, password) => {
    const signupRes = await axios.post(`${SERVER_URL}/auth/register`, {
      username,
      password,
    });
    setAccessToken(signupRes.data.accessToken);
    navigate("/dash");
    return signupRes;
  };

  // Handle logins
  const login = async (username, password) => {
    const loginRes = await axios.post(`${SERVER_URL}/auth/login`, {
      username,
      password,
    });

    setAccessToken(loginRes.data.accessToken);
    navigate("/dash");
    return loginRes;
  };

  // Handle sign outs
  const logout = () => {
    setAccessToken(null);
    navigate("/");
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

  //Handle Authenticated Post Requests
  const authPost = (url, body, options) => {
    if (!accessToken) {
      throw new Error("No access token");
    }
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken || ""}`,
    };
    return axios.post(`${SERVER_URL}${url}`, body, { headers, ...options });
  };

  // Handle access token
  const [accessToken, setAccessToken] = useLocalStorage("accessToken", null);

  // Get user data
  const [userData, loading] = useUserData(authGet, accessToken);

  // Serve context
  return (
    <Context.Provider
      value={{
        signup,
        login,
        authGet,
        user: [userData, loading],
        logout,
        authPost,
      }}
    >
      {children}
    </Context.Provider>
  );
}
