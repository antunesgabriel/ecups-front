import React from "react";
import { Switch, Route } from "react-router-dom";

const Routes = () => (
  <Switch>
    {/* ADMIN ROUTES */}
    <Route exact path="/" component={() => <h1>ola mundo</h1>} />
    <Route exact path="/admin/signin" component={() => <h1>oi</h1>} />
  </Switch>
);

export default Routes;
