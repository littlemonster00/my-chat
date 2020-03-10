import React from "react";
import { connect } from "react-redux";
import { Message } from "./Message.jsx";
import "../styles/components/MessageViewContainer.scss";

export class MessageViewContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "1",
      count: 10
    };
  }
  updateScroll = () => {
    var element = document.getElementById("message-views");
    element.scrollTop = element.scrollHeight;
  };
  componentDidUpdate = () => {
    this.updateScroll();
  };
  renderMessages() {
    const messagesRender = [];
    const messages = this.props.messages;
    if (messages.length === 1) {
      messagesRender.push(
        <Message
          lastMessage={true}
          key={messages[0].id}
          message={messages[0]}
          me={messages[0].author === this.state.userId ? true : false}
        />
      );
    } else {
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
        if (i + 2 === messages.length) {
          messagesRender.push(
            <Message
              lastMessage={true}
              key={messages[i + 1].id}
              message={messages[i + 1]}
              me={messages[i + 1].author === this.state.userId ? true : false}
            />
          );
        }
      }
    }
    return messagesRender;
  }
  render() {
    return (
      <div className="message-view-container" id="message-views">
        {this.renderMessages()}
      </div>
    );
  }
  componentDidMount() {
    console.log("component did mount");
  }
}
const mapStateToProps = state => {
  return {
    messages: state.messages
  };
};
export default connect(mapStateToProps)(MessageViewContainer);
