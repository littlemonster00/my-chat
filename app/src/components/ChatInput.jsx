import React from "react";
import { connect } from "react-redux";
import { addMessage } from "../actions/messages";
import "../styles/components/ChatInput.scss";
export class ChatInput extends React.Component {
  state = {
    textInput: ""
  };
  handleTextChange = e => {
    const textInput = e.target.value;
    this.setState(() => ({
      textInput
    }));
  };
  sendMessage = e => {
    this.props.sendMessage({
      author: "1",
      text: this.state.textInput
    });
    this.setState(() => ({ textInput: "" }));
    this._input.focus();
  };

  render() {
    return (
      <div className="chat-input">
        <textarea
          className="form-control"
          rows="3"
          id="comment"
          onChange={this.handleTextChange}
          value={this.state.textInput}
          autoFocus
          ref={c => (this._input = c)}
        ></textarea>
        <button className="btn btn-success" onClick={this.sendMessage}>
          Send
        </button>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    sendMessage: message => dispatch(addMessage(message))
  };
};
export default connect(undefined, mapDispatchToProps)(ChatInput);
