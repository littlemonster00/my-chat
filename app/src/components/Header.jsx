import React from "react";
import "../styles/components/Header.scss";

export class Header extends React.Component {
  render() {
    return (
      <div className="Header">
        <h5>Sang Le</h5>
        <p>Last seen 23 minutes ago</p>
      </div>
    );
  }
}
