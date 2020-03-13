import React from "react";
import { connect } from "react-redux";
import { Message } from "./Message.jsx";
import "../styles/components/MessageViewContainer.scss";
import gql from "graphql-tag";
import { pullMessages } from ".../../../src/actions/messages";
import { Query } from "react-apollo";

const GET_MESSAGES_CHANNEL = gql`
  query channel($id: String!) {
    channel(id: $id) {
      id
      participant {
        id
        username
      }
      messages {
        id
        text
        author {
          avatar
        }
      }
    }
  }
`;
export class MessageViewContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "5e6718b00c3e8966f7e9360a",
      channel: "5e69ee740a8fa26172d44715",
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

  render() {
    return (
      <div className="message-view-container" id="message-views">
        <Query
          query={GET_MESSAGES_CHANNEL}
          variables={{ id: this.state.channel }}
        >
          {({ loading, error, data }) => {
            if (loading) return null;
            if (error) return `Error! ${error}`;
            console.log(data.channel);
            return data.channel.messages.map((message, index) => (
              <Message {...message} key={message.id} />
            ));
          }}
        </Query>
      </div>
    );
  }
  componentDidMount() {}
}
const mapStateToProps = state => {
  return {
    messages: state.messages
  };
};
const mapDispatchToProps = dispatch => {
  return {
    pullMessages: messages => dispatch(pullMessages(messages))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageViewContainer);
