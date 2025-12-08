import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import React from "react";
import "./index.css";
import { NotificationProvider } from "./context/NotificationContext";
import { UserProvider } from "./context/UserContext";
ReactDOM.createRoot(document.getElementById("root")).render(
  <UserProvider>
    <NotificationProvider>
      <App />
    </NotificationProvider>
  </UserProvider>
);
