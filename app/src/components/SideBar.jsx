import React from "react";
import { Avatar } from "./Avatar.jsx";
import "../styles/components/SideBar.scss";
import avatar from "../../public/assets/people.png";
import { Channels } from "./Channels.jsx";
import gql from "graphql-tag";

import { Query } from "react-apollo";

const GET_USER_INFO = gql`
  query user($id: String!) {
    user(id: $id) {
      display_name
      title
      avatar
      username
      email
    }
  }
`;
export class SideBar extends React.Component {
  render() {
    return (
      <Query
        query={GET_USER_INFO}
        variables={{ id: "5e816e9b7539d77289145900" }}
      >
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          return (
            <div className="side-bar">
              <div className="side-bar__header">
                <Avatar visible={true} />
                <h5>{data.user.display_name}</h5>
              </div>
              <Channels />
            </div>
          );
        }}
      </Query>
    );
  }
}
