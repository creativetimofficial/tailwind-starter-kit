import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";

import Profile from "views/Profile.js";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/profile" component={Profile} />
      <Redirect from="/" to="/profile" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
