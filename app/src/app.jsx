import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Header } from "./components/Header.jsx";
import MessageViewContainer from "./components/MessageViewContainer.jsx";
import ChatInput from "./components/ChatInput.jsx";
import { SideBar } from "./components/SideBar.jsx";
import configStore from "./store/configStore";
import "bootstrap/dist/css/bootstrap.css";
import "./styles/styles.scss";

const store = configStore();
const MyChat = props => {
  return (
    <div className="workspace">
      <SideBar />
      <div className="container">
        <Header />
        <MessageViewContainer />
        <ChatInput />
      </div>
    </div>
  );
};
const jsx = (
  <Provider store={store}>
    <MyChat />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById("app"));
