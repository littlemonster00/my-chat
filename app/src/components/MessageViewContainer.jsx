import React from "react";
import { Message } from "./Message.jsx";
import { Messages } from "./Messages.jsx";

import "../styles/components/MessageViewContainer.scss";
import { graphql } from "react-apollo";
import { ApolloConsumer } from "@apollo/react-components";

import { Query, Subscription } from "@apollo/react-components";
import { gql } from "@apollo/client";

// import { pullMessages } from ".../../../src/actions/messages";

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
          id
          username
          avatar
        }
      }
    }
  }
`;

const LOAD_MESSAGES_ON_CHANNEL = gql`
  query messagesOnChannel($channelId: String!, $offset: Int, $limit: Int) {
    messagesOnChannel(channelId: $channelId, offset: $offset, limit: $limit) {
      id
      text
      author {
        id
        username
        avatar
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
      hasMoreItems: true,
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
    const {
      data,
      data: { loading, subscribeToMore, error, messagesOnChannel } = {},
      id,
    } = this.props;
    if (loading) return <h4>Loading...</h4>;
    console.log(data);
    if (error) console.log(error);
    return (
      <div className="message-view-container" id="message-views">
        <Messages
          messages={messagesOnChannel}
          subscribeToNewMessages={() =>
            subscribeToMore({
              document: newMessageOnChannel,
              variables: { channelId: "5eb8fb209a9f9b7d361034b9" },
              updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return { ...prev };
                const newFeedItem = subscriptionData.data.newMessageOnChannel;
                // prev.messagesOnChannel.shift();
                return Object.assign({}, prev, {
                  messagesOnChannel: [...prev.messagesOnChannel, newFeedItem],
                });
              },
            })
          }
        />
      </div>
    );
  }
  componentDidMount() {}
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages,
  };
};

export default graphql(LOAD_MESSAGES_ON_CHANNEL, {
  options: (props) => ({
    fetchPolicy: "network-only",
    variables: {
      channelId: "5eb8fb209a9f9b7d361034b9",
      offset: 0,
      limit: 20,
    },
  }),
})(MessageViewContainer);
