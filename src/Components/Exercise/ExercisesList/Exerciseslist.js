import React, { Component } from "react";
import axios from "axios";
import Aux from "../../../HOC/Aux/Aux";

export default class ExerciseList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exercises: []
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:5000/exercises/")
      .then(el => {
        this.setState({
          exercises: el.data
        });
      })
      .catch(err => console.table(err));
  }

  render() {
    // Map data into table rows;

    return (
      <Aux>
        <h3>All Records from MongoDB Atlas</h3>
        <table className="table table-sm table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>Username</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {this.state.exercises.map(el => {
              return (
                <tr key={el._id}>
                  <td>{el.username}</td>
                  <td>{el.duration}</td>
                  <td>{el.date}</td>
                  <td>{el.description}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Aux>
    );
  }
}
