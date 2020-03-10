import React from "react";
import { Avatar } from "./Avatar.jsx";
import "../styles/components/Header.scss";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const loadUserInfo = gql`
  {
    user(id: "5e6718b00c3e8966f7e9360a") {
      display_name
      title
    }
  }
`;
export class Header extends React.Component {
  render() {
    return (
      <Query query={loadUserInfo}>
        {({ loading, error, data }) => {
          if (loading) return null;
          if (error) return `Error!: ${error}`;
          return (
            <div className="Header">
              <div className="header__avatar">
                <Avatar visible={true} />
              </div>
              <div className="header__info">
                <h5>{data.user.display_name}</h5>
                <p>{data.user.title}</p>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}
