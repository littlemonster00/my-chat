import React from "react";
import { Message } from "./Message.jsx";
import "../styles/components/MessageViewContainer.scss";
import { graphql } from "react-apollo";
import { ApolloConsumer } from "@apollo/react-components";

import { Query } from "@apollo/react-components";
import { gql } from "@apollo/client";

const GET_USER_INFO = gql`
  {
    userInfo @client
  }
`;

import { pullMessages } from ".../../../src/actions/messages";

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

const newMessageOnChannel = gql`
  subscription($channelId: String!) {
    newMessageOnChannel(channelId: $channelId) {
      id
      text
      createdAt
      author {
        id
        username
        avatar
      }
    }
  }
`;

export class MessageViewContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "5e6718b00c3e8966f7e9360a",
      channel: undefined,
      count: 10,
      hasMoreItems: true
    };
  }

  updateScroll = () => {
    var element = document.getElementById("message-views");
    element.scrollTop = element.scrollHeight;
  };

  // componentWillMount() {
  //   this.unsubscribe = this.subscribe(this.props.channelId);
  // }

  // componentWillReceiveProps({ channelId }) {
  //   if (this.props.channelId !== channelId) {
  //     if (this.unsubscribe) {
  //       this.unsubscribe();
  //     }
  //     this.unsubscribe = this.subscribe(channelId);
  //   }
  // }

  // componentWillUnmount() {
  //   if (this.unsubscribe) {
  //     this.unsubscribe();
  //   }
  // }

  componentDidUpdate = () => {
    // this.updateScroll();
  };

  // Sbuscribe for load new message in this channel
  // subscribe = channelId =>
  //   this.props.data.subscribeToMore({
  //     document: newMessageOnChannel,
  //     variables: {
  //       channelId: "5e69ee740a8fa26172d44715"
  //     },
  //     updateQuery: (prev, { subscriptionData }) => {
  //       console.log(subscriptionData);
  //       // if (!subscriptionData) {
  //       //   return prev;
  //       // }

  //       // return {
  //       //   ...prev,
  //       //   messages: [subscriptionData.newChannelMessage, ...prev.messages]
  //       // };
  //     }
  //   });

  render() {
    const {
      data: { loading, channel: { messages, participant } = {}, error },
      id
    } = this.props;
    if (loading) return <h4>Loading...</h4>;
    if (error) console.log(error);
    return (
      <ApolloConsumer>
        {client => {
          client.writeQuery({
            query: gql`
              {
                channel
              }
            `,
            data: { channel: { messages, participant } }
          });

          return (
            <div className="message-view-container" id="message-views">
              {messages.map((message, index) => {
                return <Message key={message.id} {...message} />;
              })}
            </div>
          );
        }}
      </ApolloConsumer>
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

export default graphql(GET_MESSAGES_CHANNEL, {
  options: props => ({
    fetchPolicy: "network-only",
    variables: {
      id: "5e69ee740a8fa26172d44715"
    }
  })
})(MessageViewContainer);
