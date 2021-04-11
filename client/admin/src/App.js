import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Layout from "./components/dashboard/Layout";
import Error from "./pages/error/Error";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/app" component={Layout} />
        <Route exact path="/app/import" component={Layout} />
        <Route exact path="/app/dashboard" component={Layout} />
        <Route exact path="/app/profile" component={Layout} />
        <Route exact path="/app/view" component={Layout} />
        <Route path="/app/manage" component={Layout} />
        <Route component={Error} />
      </Switch>
    </Router>
  );

  // #######################################################################
}
