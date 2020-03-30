import React from "react";
import "../styles/components/Channels.scss";
import { Channel } from "./Channel.jsx";
import { Avatar } from "./Avatar.jsx";
import { Query } from "@apollo/react-components";
import gql from "graphql-tag";

export class Channels extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <div className="channels-container">
        {[1, 2, 3, 4, 5].map(channel => (
          <Channel key={channel} id={channel} />
        ))}
      </div>
    );
  }
}
