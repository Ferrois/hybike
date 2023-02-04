import { createBrowserRouter } from "react-router-dom";
import { AuthLayout } from "./pages/layouts/AuthLayout";
import { Login } from "./pages/Login";
import Loyalty from "./pages/Loyalty";
import Main from "./pages/Main";
import { Register } from "./pages/Register";
import { View } from "./pages/View";

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      { path: "/", element: <Main /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/view", element: <View /> },
      { path: "/loyal", element: <Loyalty /> },
    ],
  },
]);
