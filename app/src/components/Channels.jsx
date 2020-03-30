import React from "react";
import "../styles/components/Channels.scss";
import { Channel } from "./Channel.jsx";
import { Avatar } from "./Avatar.jsx";

import gql from "graphql-tag";

import { Query } from "react-apollo";

const GET_CHANNELS = gql`
  query channels($parId: String!) {
    channels(parId: $parId) {
      id
      participant {
        id
        username
        email
      }
    }
  }
`;
export class Channels extends React.Component {
  state = {
    userId: "5e816e9b7539d77289145900"
  };
  componentDidMount() {}

  render() {
    return (
      <Query query={GET_CHANNELS} variables={{ parId: this.state.userId }}>
        {({ loading, error, data: { channels } = {} }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          return (
            <div className="channels-container">
              {channels.map(channel => {
                let [participant] = channel.participant.filter(
                  par => par.id !== this.state.userId
                );
                return <Channel key={channel.id} participant={participant} />;
              })}
            </div>
          );
        }}
      </Query>
    );
  }
}
