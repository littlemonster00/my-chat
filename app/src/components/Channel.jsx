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
        <div className="channel_content">Channel {this.props.id}</div>
        <div className="channel_info">Info</div>
      </div>
    );
  }
}
