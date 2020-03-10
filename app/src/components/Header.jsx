import React from "react";
import { Avatar } from "./Avatar.jsx";
import "../styles/components/Header.scss";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const announcement = gql`
  {
    announcement
  }
`;
export class Header extends React.Component {
  render() {
    return (
      <Query query={announcement}>
        {({ loading, error, data }) => {
          if (loading) return null;
          if (error) return `Error!: ${error}`;
          return (
            <div className="Header">
              <div className="header__avatar">
                <Avatar visible={true} />
              </div>
              <div className="header__info">
                <h5>Sang Le</h5>
                <p>{data.announcement}</p>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}
