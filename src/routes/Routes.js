import React from "react";
import { Switch, Route } from "react-router-dom";

import { SignIn } from "~/screens/Admin/SignIn/SignIn.page";

const Routes = () => (
  <Switch>
    {/* ADMIN ROUTES */}
    <Route exact path="/" component={() => <h1>ola mundo</h1>} />
    <Route exact path="/admin/signin" component={SignIn} />
  </Switch>
);

export default Routes;
