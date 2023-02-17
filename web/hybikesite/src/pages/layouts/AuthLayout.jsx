import { Outlet } from "react-router-dom";
import { AuthProvider } from "../../Context/AuthContext";
import Toastify from "./Toastify";
import "../../App.css"

export function AuthLayout() {
  return (
    <AuthProvider>
      <div className="poppins">
        <Outlet />
        <Toastify />
      </div>
    </AuthProvider>
  );
}
