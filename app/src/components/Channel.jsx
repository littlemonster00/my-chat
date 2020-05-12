import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

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
          <Link to="/users">
            <p>{this.props.participant.username}</p>
          </Link>
        </div>
        <div className="channel_info">Info</div>
      </div>
    );
  }
}
