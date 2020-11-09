import React from "react";
import { Route, Switch } from "wouter";
import Home from "./pages";

const Router = () => (
  <Switch>
    <Route path="/" component={Home} />
  </Switch>
);

export default Router;
