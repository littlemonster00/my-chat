import React, { Component } from "react";
import { gql } from "@apollo/client";
import { Mutation } from "@apollo/react-components";

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      error
      token
    }
  }
`;

export default class LoginPage extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      error: ""
    };

    this.handlePassChange = this.handlePassChange.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.dismissError = this.dismissError.bind(this);
  }

  dismissError() {
    this.setState({ error: "" });
  }

  handleSubmit(evt) {
    evt.preventDefault();

    if (!this.state.username) {
      return this.setState({ error: "Username is required" });
    }

    if (!this.state.password) {
      return this.setState({ error: "Password is required" });
    }
  }

  handleUserChange(evt) {
    this.setState({
      username: evt.target.value
    });
  }

  handlePassChange(evt) {
    this.setState({
      password: evt.target.value
    });
  }

  render() {
    return (
      <Mutation mutation={LOGIN}>
        {(login, { data, loading }) => {
          if (!loading && data) {
            console.log(data.login.token);
            localStorage.setItem("authorization", data.login.token);
          }
          return (
            <div className="Login">
              <form
                onSubmit={e => {
                  e.preventDefault();
                  console.log(this.state);
                  login({
                    variables: {
                      username: this.state.username,
                      password: this.state.password
                    }
                  });
                }}
              >
                <label>User Name</label>
                <input
                  type="text"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleUserChange}
                />
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handlePassChange}
                />
                <input type="submit" value="Log In" />
              </form>
            </div>
          );
        }}
      </Mutation>
    );
  }
}
