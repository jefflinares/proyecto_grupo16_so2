import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Layout/Home/Home";
import Layout from "./Layout/Layout";

const Routes = () => (
  <Router>
    <Layout>
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </Layout>
  </Router>
);

export default Routes;
