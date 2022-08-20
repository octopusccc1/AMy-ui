import React, { useRef } from "react";
import { render } from "react-dom";
import "./styles/index.less";
import "antd/dist/antd.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeLayout from "./views/homeLayout";

const App = () => {
  return (
      <Router>
        <Routes>
          <Route path="*" element={<HomeLayout/>}></Route>
        </Routes>
      </Router>
  );
};

render(<App />, document.getElementById("app"));
