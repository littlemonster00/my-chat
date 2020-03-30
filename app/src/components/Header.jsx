import React from "react";
import { graphql } from "react-apollo";
import { ApolloConsumer } from "@apollo/react-components";

import { Avatar } from "./Avatar.jsx";
import "../styles/components/Header.scss";
import gql from "graphql-tag";

// import { Query } from "react-apollo";
import { Query } from "@apollo/react-components";

const GET_USER_INFO = gql`
  query user($id: String!) {
    user(id: $id) {
      display_name
      title
      avatar
    }
  }
`;

class Header extends React.Component {
  render() {
    const {
      data: { loading, error, user },
      id
    } = this.props;
    if (loading) return <h4>Loading...</h4>;
    if (error) return console.log(error);
    return (
      <ApolloConsumer>
        {client => {
          client.writeQuery({
            query: gql`
              {
                userInfo
              }
            `,
            data: { userInfo: user }
          });
          return (
            <div className="Header">
              <React.Fragment>
                <div className="header__avatar">
                  <Avatar visible={true} urlAvatar={user.avatar} />
                </div>
                <div className="header__info">
                  <h5>{user.display_name}</h5>
                  <p>{user.title}</p>
                </div>
              </React.Fragment>
            </div>
          );
        }}
      </ApolloConsumer>
    );
  }
}

export default graphql(GET_USER_INFO, {
  options: props => ({
    fetchPolicy: "network-only",
    variables: {
      id: "5e816e9b7539d77289145900"
    }
  })
})(Header);
