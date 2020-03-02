import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
export default class CreateExercises extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      description: "",
      date: new Date(),
      duration: "",
      users: []
    };

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    axios.get("http://localhost:5000/users/").then(res => {
      // map this to get all usernames;

      if (res.data.length > 0) {
        this.setState({
          users: res.data.map(el => el.username),
          username: res.data[0].username
        });
      }
    });
  }

  onChangeUsername(e) {
    this.setState({ username: e.target.value });
  }
  onChangeDescription(e) {
    this.setState({ description: e.target.value });
  }
  onChangeDate(e) {
    this.setState({ date: e });
  }
  onChangeDuration(e) {
    this.setState({ duration: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date
    };

    console.log(exercise);

    axios
      .post("http://localhost:5002/exercises/store", exercise)
      .then(res => console.log("Exercise Added"));

    // window.location = "/";
  }

  render() {
    return (
      <div>
        <h3>Add Exercise</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username</label>
            <select
              name="username"
              required
              value={this.state.username}
              className="form-control"
              onChange={this.onChangeUsername}
            >
              {this.state.users.map(user => {
                return (
                  <option key={user} value={user}>
                    {user}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label>Description: </label>
            <textarea
              name="description"
              onChange={this.onChangeDescription}
              className="form-control"
            ></textarea>
          </div>
          <div className="form-group">
            <label> Duration:</label>
            <input
              type="text"
              className="form-control"
              onChange={this.onChangeDuration}
            />
          </div>
          <div className="form-group">
            <label>Date: </label>
            <DatePicker
              onChange={this.onChangeDate}
              selected={this.state.date}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              className="btn btn-primary"
              value="Create Exercise Log"
            />
          </div>
        </form>
      </div>
    );
  }
}
