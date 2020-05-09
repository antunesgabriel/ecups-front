import React from "react";
import { Switch, Route } from "react-router-dom";

import RouteAdmin from "./RouteAdmin";
import RoutePlayer from "./RoutePlayer";

// ADMIN
import { SignIn } from "~/screens/Admin/SignIn/SignIn.page";

const Routes = () => (
  <Switch>
    {/* ADMIN ROUTES */}
    <Route exact path="/" component={() => <h1>ola mundo</h1>} />
    <RouteAdmin exact path="/admin/signin" component={SignIn} />
    <RouteAdmin
      exact
      path="/admin/dashboard"
      isPrivate
      component={() => <h1> dashboard</h1>}
    />
    <RoutePlayer
      exact
      path="/player/signin"
      component={() => <h1>login player</h1>}
    />
    <RoutePlayer
      exact
      path="/player/dashboard"
      isPrivate
      component={() => <h1>dashboard player</h1>}
    />
  </Switch>
);

export default Routes;
