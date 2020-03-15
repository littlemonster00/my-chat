import React from "react";
import { Avatar } from "./Avatar.jsx";
import "../styles/components/Header.scss";
import gql from "graphql-tag";

// import { Query } from "react-apollo";
import { Query } from "@apollo/react-components";

const loadUserInfo = gql`
  {
    user(id: "5e6718b00c3e8966f7e9360a") {
      display_name
      title
      avatar
    }
  }
`;

export class Header extends React.Component {
  render() {
    return (
      <div className="Header">
        <Query query={loadUserInfo}>
          {({ loading, error, data }) => {
            if (loading) return <h4>Loading...</h4>;
            if (error) console.log(error);
            return (
              <React.Fragment>
                <div className="header__avatar">
                  <Avatar visible={true} urlAvatar={data.user.avatar} />
                </div>
                <div className="header__info">
                  <h5>{data.user.display_name}</h5>
                  <p>{data.user.title}</p>
                </div>
              </React.Fragment>
            );
          }}
        </Query>
      </div>
    );
  }
}
