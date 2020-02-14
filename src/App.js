import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
// Router for react; pretty straight forward
import { BrowserRouter as Router, Route } from "react-router-dom";
// Components
import Navbar from "./Components/Navbar/Navbar";
import ExercicesList from "./Components/Exercise/ExercisesList/Exerciseslist";
import EditExercise from "./Components/Exercise/EditExercise/EditExercise";
import CreateExercise from "./Components/Exercise/CreateExercise/CreateExercise";
import CreateUser from "./Components/User/User";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component={ExercicesList} />
        <Route path="/edit/:id" component={EditExercise} />
        <Route path="/create" component={CreateExercise} />
        <Route path="/user" component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;
