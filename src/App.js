import "./App.css";

import React, { useEffect } from "react";
import { renderRoutes } from "react-router-config";
import { BrowserRouter as Router } from "react-router-dom";
import { MainRoutes } from "router";

function App() {
  return <Router id={"root"}>{renderRoutes(MainRoutes)}</Router>;
}

export default App;
