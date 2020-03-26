import React from "react";
import "./App.css";
import Landing from "./Components/Landing";
import { BrowserRouter as Router, Route } from "react-router-dom";
import RunJob from "./Components/RunJob";
import CreateCluster from "./Components/CreateCluster";
import AutomateJob from "./Components/AutomateJob";

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Landing} />
        <Route exact path="/createCluster" component={CreateCluster} />
        <Route exact path="/automateJob" component={AutomateJob} />
        <Route exact path="/runJob" component={RunJob} />
      </div>
    </Router>
  );
}

export default App;
