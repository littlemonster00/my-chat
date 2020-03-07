import React from "react";
import { Message } from "./Message.jsx";
import "../styles/components/MessageViewContainer.scss";
import messages from "./playground/messages.js";

export class MessageViewContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "1",
      messages: [{}],
      count: 10
    };
  }
  renderMessages() {
    const messagesRender = [];
    for (let i = 0; i < messages.length - 1; i++) {
      if (messages[i].author !== messages[i + 1].author) {
        messagesRender.push(
          <Message
            lastMessage={true}
            key={messages[i].id}
            message={messages[i]}
            me={messages[i].author === this.state.userId ? true : false}
          />
        );
      } else {
        messagesRender.push(
          <Message
            key={messages[i].id}
            message={messages[i]}
            me={messages[i].author === this.state.userId ? true : false}
          />
        );
      }
    }
    return messagesRender;
  }
  render() {
    return (
      <div className="message-view-container">{this.renderMessages()}</div>
    );
  }
  componentDidMount() {
    console.log("component did mount");
  }
}
