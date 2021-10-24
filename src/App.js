import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import StudentCard from "./components/studentCard";
import UserForm from "./components/userForm";

function App() {
  return (
    <Router>
      <Route path="/student-card/userform/" component={UserForm} />
      <Route exact path="/student-card/" component={StudentCard} />
    </Router>
  );
}

export default App;
