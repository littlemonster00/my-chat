import React from "react";
import "../styles/components/Avatar.scss";
import avatar from "../../public/assets/people.png";
export class Avatar extends React.Component {
  render() {
    return (
      <div className="avatar-container">
        {this.props.visible === true && (
          <img className="avatar" src={avatar} alt="avatar" />
        )}
      </div>
    );
  }
}
