import "./App.css";
import About from "./Views/About";
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
            <Route path="about" element={<About/>}></Route>
            <Route path="logs" element={<Logs/>}></Route>
          </Route>
        </Routes>
    </Router>
  );
}

export default App;
