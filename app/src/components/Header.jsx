import React from "react";
import { Avatar } from "./Avatar.jsx";
import "../styles/components/Header.scss";

export class Header extends React.Component {
  render() {
    return (
      <div className="Header">
        <div className="header__avatar">
          <Avatar visible={true} />
        </div>
        <div className="header__info">
          <h5>Sang Le</h5>
          <p>Last seen 23 minutes ago</p>
        </div>
      </div>
    );
  }
}
