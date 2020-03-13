import React from "react";
import { connect } from "react-redux";
import { addMessage } from "../actions/messages";
import "../styles/components/ChatInput.scss";
import gql from "graphql-tag";
import { Mutation } from "@apollo/react-components";
import { ApolloConsumer } from "react-apollo";

const ADD_MESSAGE = gql`
  mutation addMessage($type: String) {
    addMessage(text: $type) {
      id
      text
      author
    }
  }
`;
const WithApolloClient = () => (
  <ApolloConsumer>
    {client => {
      console.log(client);
    }}
  </ApolloConsumer>
);

export class ChatInput extends React.Component {
  state = {
    textInput: ""
  };
  handleTextChange = e => {
    const textInput = e.target.value;
    if (textInput !== "\n") {
      e.target.style.cssText = "height:" + e.target.scrollHeight + "px";
      this.setState(() => ({
        textInput
      }));
    }
  };
  onEnterKePress = event => {
    if (event.keyCode == 13 && !event.shiftKey) {
      this.sendMessage();
      event.target.style.cssText = "height: 36px";
    }
  };
  onAutoGrow = e => {};
  sendMessage = e => {
    this.props.sendMessage({
      author: Math.floor(Math.random() * 2 + 1).toString(),
      text: this.state.textInput
    });
    this.setState(() => ({ textInput: "" }));
    document.getElementById("input-msg").style.cssText = "height: 36px";
    this._input.focus();
  };

  render() {
    return (
      <div className="chat-input">
        <textarea
          className="form-control input-msg"
          rows="1"
          id="input-msg"
          onChange={this.handleTextChange}
          value={this.state.textInput}
          autoFocus
          ref={c => (this._input = c)}
          onKeyDown={this.onEnterKePress}
          onInput={this.onAutoGrow}
        ></textarea>
        {this.state.textInput && (
          <button
            type="submit"
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
