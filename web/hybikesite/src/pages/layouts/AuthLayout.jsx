import { Outlet } from "react-router-dom";
import { AuthProvider } from "../../Context/AuthContext";

export function AuthLayout() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}
