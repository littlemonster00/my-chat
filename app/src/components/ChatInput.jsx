import React from "react";
import "../styles/components/ChatInput.scss";
export class ChatInput extends React.Component {
  render() {
    return (
      <div className="chat-input">
        <textarea className="form-control" rows="3" id="comment"></textarea>
        <button className="btn btn-success">Send</button>
      </div>
    );
  }
}
