import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "../pages/HomePage";
import SignUp from "../pages/auth/SignUpPage";
import SignIn from "../pages/auth/SignInPage";
import RootLayout from "../layouts/RootLayout";
import SearchPage from "../pages/SearchPage";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import ProfilePage from "../pages/ProfilePage";
import UserPage from "../pages/UserPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <MainLayout />,
        children: [
          {
            path: "/",
            element: <Navigate to="/feed" replace={true} />,
          },
          {
            path: "/feed",
            element: <Home />,
          },
          {
            path: "/search",
            element: <SearchPage />,
          },
          {
            path: "/profile/",
            element: <ProfilePage />,
          },
          {
            path: "/profile/:username",
            element: <UserPage />,
          },
        ],
      },
      {
        path: "/auth",
        element: <AuthLayout />,
        children: [
          {
            path: "/auth/sign-up",
            element: <SignUp />,
          },
          {
            path: "/auth/sign-in",
            element: <SignIn />,
          },
        ],
      },
    ],
  },
  {},
]);
