import React from "react";
import "../styles/components/Message.scss";
import { Avatar } from "./Avatar.jsx";
export class Message extends React.Component {
  render() {
    return (
      <div
        className={
          this.props.me === true
            ? "message-container seft"
            : "message-container mine"
        }
      >
        {this.props.lastMessage === true ? (
          <Avatar visible={true} />
        ) : (
          <Avatar />
        )}
        <div
          className={
            this.props.me === true ? "message" : "message message__mine"
          }
        >
          <span className="text">
            author: {this.props.message.author} - {this.props.message.text}
          </span>
        </div>
      </div>
    );
  }
}
