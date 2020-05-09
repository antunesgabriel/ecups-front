import React from "react";
import { Switch, Route } from "react-router-dom";

import RouteAdmin from "./RouteAdmin";
import RoutePlayer from "./RoutePlayer";

// ADMIN
import { SignIn } from "~/pages/Admin/SignIn/SignIn.page";
import LogoutPage from "~/pages/Logout/Logout.page";
import RootPage from "~/pages/Root/RootPage";

const Routes = () => (
  <Switch>
    <Route exact path="/" component={RootPage} />
    <Route exact path="/logout" component={LogoutPage} />

    {/* ADMIN ROUTES */}
    <RouteAdmin exact path="/admin/signin" component={SignIn} />
    <RouteAdmin
      exact
      path="/admin/dashboard"
      isPrivate
      component={() => <h1> dashboard</h1>}
    />

    {/* PLAYER ROUTES */}
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
