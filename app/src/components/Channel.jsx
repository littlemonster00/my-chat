import React from "react";
import "../styles/components/Channel.scss";
import { Avatar } from "./Avatar.jsx";
import { Query } from "@apollo/react-components";
import gql from "graphql-tag";

export class Channel extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <div className="channel-container">
        <div className="channel_avatar">Avatar</div>
        <div className="channel_content">
          <a href={this.props.participant.username}>
            {this.props.participant.username}
          </a>
        </div>
        <div className="channel_info">Info</div>
      </div>
    );
  }
}
