import React from "react";
import { Avatar } from "./Avatar.jsx";
import "../styles/components/SideBar.scss";
import avatar from "../../public/assets/people.png";

export class SideBar extends React.Component {
  render() {
    return (
      <div className="side-bar">
        <Avatar visible={true} />
        <h3>Chats</h3>
      </div>
    );
  }
}
