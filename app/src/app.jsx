import React from "react";
import ReactDOM from "react-dom";
// Config apollo server
import { Provider } from "react-redux";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import gql from "graphql-tag";

// Import components
import { Header } from "./components/Header.jsx";
import MessageViewContainer from "./components/MessageViewContainer.jsx";
import ChatInput from "./components/ChatInput.jsx";
import { SideBar } from "./components/SideBar.jsx";
import configStore from "./store/configStore";
import "bootstrap/dist/css/bootstrap.css";
import "./styles/styles.scss";

// import action of redux state
import { pullMessages } from "../src/actions/messages";
const store = configStore();
const MyChat = props => {
  return (
    <div className="workspace">
      {/* <SideBar /> */}
      <div className="container">
        <Header />
        <MessageViewContainer />
        <ChatInput />
      </div>
    </div>
  );
};

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});
client
  .query({
    query: gql`
      {
        loadMessages {
          id
          author
          text
          createdAt
        }
      }
    `
  })
  .then(response => {
    const messages = response.data.loadMessages;
    store.dispatch(pullMessages(messages));
  });
const App = () => (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <MyChat />
    </Provider>
  </ApolloProvider>
);

ReactDOM.render(<App />, document.getElementById("app"));
