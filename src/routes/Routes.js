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
import Perfil from "~/pages/Perfil/Perfil.page";
import GamePage from "~/pages/Admin/Game/Game.page";
import RolePage from "~/pages/Admin/Role/Role.page";
import LeagueTypePage from "~/pages/Admin/LeagueType/LeagueType.page";
import PlayersPage from "~/pages/Admin/Players/Players.page";
import LeagueListPage from "~/pages/Leagues/LeaguesList.page";
import PlayerHomePage from "~/pages/Players/PlayerHome/PlayerHome.page";
import PlayerTeamPage from "~/pages/Players/PlayerTeam/PlayerTeam.page";
import PlayerInvitationPage from "~/pages/Players/PlayerInvitaion/PlayerInvitation.page";
import SubscriptionPage from "~/pages/Subscription/Subscription.page";
import LeagueCreatePage from "~/pages/Leagues/LeagueCreate/LeagueCreate.page";

const Routes = () => (
  <Switch>
    <Route exact path="/" component={RootPage} />
    <Route exact path="/logout" component={LogoutPage} />

    {/* ADMIN ROUTES */}
    <RouteAdmin exact path="/admin/signin" component={SignInAdmin} />
    <RouteAdmin exact path="/admin/signup" component={SignUpAdmin} />
    <RouteAdmin exact path="/admin/home" isPrivate component={AdminHome} />
    <RouteAdmin exact path="/admin/perfil" isPrivate component={Perfil} />
    <RouteAdmin exact path="/admin/games" isPrivate component={GamePage} />
    <RouteAdmin exact path="/admin/roles" isPrivate component={RolePage} />
    <RouteAdmin
      exact
      path="/admin/league-types"
      isPrivate
      component={LeagueTypePage}
    />
    <RouteAdmin exact path="/admin/players" isPrivate component={PlayersPage} />
    <RouteAdmin
      exact
      path="/admin/leagues"
      isPrivate
      component={LeagueListPage}
    />
    <RouteAdmin
      exact
      path="/admin/league/create"
      isPrivate
      component={LeagueCreatePage}
    />

    {/* PLAYER ROUTES */}
    <RoutePlayer exact path="/player/signin" component={SignInPlayer} />
    <RoutePlayer exact path="/player/signup" component={SignUpPlayer} />
    <RoutePlayer
      exact
      path="/player/home"
      isPrivate
      component={PlayerHomePage}
    />
    <RoutePlayer exact path="/player/perfil" isPrivate component={Perfil} />
    <RoutePlayer
      exact
      path="/player/leagues"
      isPrivate
      component={LeagueListPage}
    />
    <RoutePlayer
      exact
      path="/player/league/create"
      isPrivate
      component={LeagueCreatePage}
    />
    <RoutePlayer
      exact
      path="/player/team"
      isPrivate
      component={PlayerTeamPage}
    />

    <RoutePlayer
      exact
      path="/player/invitations"
      isPrivate
      component={PlayerInvitationPage}
    />
    <RoutePlayer
      exact
      path="/player/subscriptions"
      isPrivate
      component={SubscriptionPage}
    />
    <RoutePlayer
      exact
      path="/player/subscriptions/:leagueId"
      isPrivate
      component={SubscriptionPage}
    />
  </Switch>
);

export default Routes;
