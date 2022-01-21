import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import './App.css'

ReactDOM.render(
  // <React.StrictMode>
    /* </React.StrictMode> */
    <Router>
    <App />
    </Router>

  ,
  document.getElementById("root")
);
