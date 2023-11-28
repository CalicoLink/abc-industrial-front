import "./App.css";
import Clients from "./Views/Clients";
import Home from "./Views/Home";
import Logs from "./Views/Logs";

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/">
            <Route index element={<Home/>}></Route>
            <Route path="clients" element={<Clients/>}></Route>
            <Route path="logs" element={<Logs/>}></Route>
          </Route>
        </Routes>
    </Router>
  );
}

export default App;
