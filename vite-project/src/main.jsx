import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

// Render the application with React Strict Mode and BrowserRouter
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter> {/* Wrapping the entire app in BrowserRouter */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
