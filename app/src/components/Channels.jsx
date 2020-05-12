import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "../styles/components/Channels.scss";
import { Channel } from "./Channel.jsx";
import { Avatar } from "./Avatar.jsx";
import MessageViewContainer from "./MessageViewContainer.jsx";
import ChatInput from "./ChatInput.jsx";

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
const MY_CHANNELS = gql`
  query myChannels($limit: Int) {
    myChannels(limit: $limit) {
      id
      participant {
        id
        username
      }
    }
  }
`;

function Users() {
  return <h2>It's working</h2>;
}

export class Channels extends React.Component {
  state = {
    userId: "5eb8fb209a9f9b7d361034b5",
  };
  componentDidMount() {
    console.log("hello this is channels");
  }

  render() {
    return (
      <Query query={MY_CHANNELS} variables={{ limit: 10 }}>
        {({ loading, error, data: { myChannels } = {} }) => {
          console.log(myChannels);
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          return (
            <Router>
              <div className="channels-container">
                {myChannels.map((channel) => {
                  let [participant] = channel.participant.filter(
                    (par) => par.id !== this.state.userId
                  );
                  return <Channel key={channel.id} participant={participant} />;
                })}
              </div>
              <Switch>
                <Route path="/users">
                  <MessageViewContainer />
                  <ChatInput />
                </Route>
              </Switch>
            </Router>
          );
        }}
      </Query>
    );
  }
}
