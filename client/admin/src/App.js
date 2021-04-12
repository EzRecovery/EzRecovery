import { useState } from "react";
import "./App.css";
//import Main from "./components/main/Main";
import Dashboard from './components/dashboard/Dashboard'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from "./components/login/Login";

const App = () => {

  { document.title = "EzRecovery Dashboard" }

  return (
    <div >

      <Router>
        <Switch>
          <Route path='/app' component={Dashboard} />
          <Route exact path='/login' component={Login} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;