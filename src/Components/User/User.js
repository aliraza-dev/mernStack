import React, { Component } from "react";
import axios from "axios";
class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: ""
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const user = {
      username: this.state.username
    };

    console.log(user);
    axios
      .post("http://localhost:5000/users/add", user)
      .then(res => console.log("User Added"));
    this.setState({
      username: ""
    });
  }

  render() {
    return (
      <div>
        <h2>User</h2>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              onChange={this.onChangeUsername}
              value={this.state.username}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <input type="submit" className="btn btn-primary" value="Add User" />
          </div>
        </form>
      </div>
    );
  }
}

export default User;
