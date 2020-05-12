import React from "react";
import { Switch, Route } from "react-router-dom";

import RouteAdmin from "./RouteAdmin";
import RoutePlayer from "./RoutePlayer";

// ADMIN
import { SignInAdmin } from "~/pages/Admin/SignIn/SignIn.page";
import LogoutPage from "~/pages/Logout/Logout.page";
import RootPage from "~/pages/Root/RootPage";
import { SignUpAdmin } from "~/pages/Admin/SignUp/SignUp.page";
import { SignInPlayer } from "~/pages/Players/SignIn/SignIn.page";
import { SignUpPlayer } from "~/pages/Players/SignUp/SignUp.page";
import { AdminHome } from "~/pages/Admin/Home/AdminHome.page";
import Account from "~/pages/Account/Account.page";
import GamePage from "~/pages/Admin/Game/Game.page";
import RolePage from "~/pages/Admin/Role/Role.page";
import LeagueTypePage from "~/pages/Admin/LeagueType/LeagueType.page";

const Routes = () => (
  <Switch>
    <Route exact path="/" component={RootPage} />
    <Route exact path="/logout" component={LogoutPage} />

    {/* ADMIN ROUTES */}
    <RouteAdmin exact path="/admin/signin" component={SignInAdmin} />
    <RouteAdmin exact path="/admin/signup" component={SignUpAdmin} />
    <RouteAdmin exact path="/admin/home" isPrivate component={AdminHome} />
    <RouteAdmin exact path="/admin/account" isPrivate component={Account} />
    <RouteAdmin exact path="/admin/games" isPrivate component={GamePage} />
    <RouteAdmin exact path="/admin/roles" isPrivate component={RolePage} />
    <RouteAdmin
      exact
      path="/admin/league-types"
      isPrivate
      component={LeagueTypePage}
    />

    {/* PLAYER ROUTES */}
    <RoutePlayer exact path="/player/signin" component={SignInPlayer} />
    <RoutePlayer exact path="/player/signup" component={SignUpPlayer} />
    <RoutePlayer
      exact
      path="/player/home"
      isPrivate
      component={() => <h1>dashboard player</h1>}
    />
  </Switch>
);

export default Routes;
