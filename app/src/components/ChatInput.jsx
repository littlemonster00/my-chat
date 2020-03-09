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
  onEnterKePress = event => {
    if (event.keyCode == 13 && !event.shiftKey) {
      this.sendMessage();
    }
  };
  /*   autoGrow = oField => {
    console.log(oField);
    if (oField.scrollHeight > oField.clientHeight) {
      oField.style.height = oField.scrollHeight + "px";
    }
  }; */
  sendMessage = e => {
    this.props.sendMessage({
      author: Math.floor(Math.random() * 2 + 1).toString(),
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
          rows="1"
          id="comment"
          onChange={this.handleTextChange}
          value={this.state.textInput}
          autoFocus
          ref={c => (this._input = c)}
          onKeyDown={this.onEnterKePress}
          // onKeyUp={this.autoGrow}
        ></textarea>
        {this.state.textInput && (
          <button
            className="btn btn-success btn-send-msg"
            onClick={this.sendMessage}
          >
            Send
          </button>
        )}
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
