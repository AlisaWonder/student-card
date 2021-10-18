import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import StudentCard from "./components/studentCard";
import UserForm from "./components/userForm";

function App() {
  return (
    <Router>
      <Route exact path="/" component={StudentCard} />
      <Route path="/userform" component={UserForm} />
    </Router>
  );
}

export default App;
