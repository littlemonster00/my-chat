import React from "react";
import ReactDOM from "react-dom";
import { Header } from "./components/Header.jsx";
import { MessageViewContainer } from "./components/MessageViewContainer.jsx";
import { ChatInput } from "./components/ChatInput.jsx";
import "bootstrap/dist/css/bootstrap.css";
import "./styles/styles.scss";

const jsx = (
  <div className="container">
    <Header />
    <MessageViewContainer />
    <ChatInput />
  </div>
);

ReactDOM.render(jsx, document.getElementById("app"));
