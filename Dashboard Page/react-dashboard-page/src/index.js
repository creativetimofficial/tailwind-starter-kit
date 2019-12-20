import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";

import Dashboard from "views/Dashboard.js";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/dashboard" component={Dashboard} />
      <Redirect from="/" to="/dashboard" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
