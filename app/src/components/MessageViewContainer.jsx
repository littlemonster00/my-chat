import React from "react";
import { Message } from "./Message.jsx";
import "../styles/components/MessageViewContainer.scss";

export class MessageViewContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 15, 16, 17, 18],
      count: 10
    };
  }
  render() {
    return (
      <div className="message-view-container">
        {this.state.messages.map(message => {
          return <Message key={message} />;
        })}
      </div>
    );
  }
  componentDidMount() {
    console.log("component did mount");
  }
}
