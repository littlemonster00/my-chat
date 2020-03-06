import React from "react";
import ReactDOM from "react-dom";
import { Header } from "./components/Header.jsx";

const jsx = (
  <div>
    <h1>Hello</h1>
    <Header />
  </div>
);

ReactDOM.render(jsx, document.getElementById("app"));
