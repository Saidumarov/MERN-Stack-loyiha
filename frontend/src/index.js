import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import FoormProvayder from "./FoormProvayder";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <FoormProvayder>
      <App />
    </FoormProvayder>
  </React.StrictMode>
);
