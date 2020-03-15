import React from "react";
import "../styles/components/Message.scss";
import { Avatar } from "./Avatar.jsx";
import { Query } from "@apollo/react-components";
import gql from "graphql-tag";

export class Message extends React.Component {
  render() {
    return (
      <div className="message-container">
        <Avatar urlAvatar={this.props.author && this.props.author.avatar} />
        <div className="message">
          <span className="text">{this.props.text}</span>
        </div>
      </div>
    );
  }
}
