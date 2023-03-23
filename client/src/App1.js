import React from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { Menu } from "semantic-ui-react";
import Root from "./components/root";
import Login from "./components/login";
import App from './App';
import Auth from "./components/auth";
import ErrorPage from "./components/error";
import Tabels from "./components/Tabels";
import "./index.css";
// import Table from "./components/Table";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "",
        element: <App />,
      },
      {
        path: "Update",
        element: <Tabels/>,
      },
      {
        path: "expenses/authenticate",
        element: <Auth />,
      },
      {
        path: "*",
        element: <ErrorPage/>,
      },
    ],
  },
]);
export default function App1() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}