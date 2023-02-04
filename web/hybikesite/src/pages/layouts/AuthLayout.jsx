import { Outlet } from "react-router-dom";
import { AuthProvider } from "../../Context/AuthContext";
import Toastify from "./Toastify";

export function AuthLayout() {
  return (
    <AuthProvider>
      <Outlet />
      <Toastify/>
    </AuthProvider>
  );
}
