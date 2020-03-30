import React from "react";
import { Message } from "./Message.jsx";
import "../styles/components/Message.scss";
import { Avatar } from "./Avatar.jsx";
import { Query } from "@apollo/react-components";
import gql from "graphql-tag";

export class Messages extends React.Component {
  componentDidMount() {
    this.props.subscribeToNewMessages();
  }

  render() {
    if (this.props.messages) {
      return this.props.messages.map(message => {
        return <Message key={message.id} {...message} />;
      });
    } else return <p>No messages on this channel</p>;
  }
}
