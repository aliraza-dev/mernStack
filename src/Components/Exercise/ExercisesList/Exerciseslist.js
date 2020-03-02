import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import Aux from "../../../HOC/Aux/Aux";

const Json = props => {
  const [state, setState] = useState([]);
  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users").then(res => {
      setState(res.data);
    });
    return () => {};
  }, []);
  return Object.keys(state).map(el => {
    return <option key={state[el].username} value={state[el].username}>{state[el].username}</option>
  });
};

export default class ExerciseList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exercises: []
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:5002/exercises/")
      .then(el => {
        this.setState({
          exercises: el.data
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    // Map data into table rows;
    console.log("Rendered");
    return (
      <Aux>
        <h3>All Records from MongoDB Atlas</h3>
        <select>
          <option>Something</option>
          <Json />
        </select>
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
