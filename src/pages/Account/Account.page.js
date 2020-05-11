import React from "react";
import { Grid } from "@material-ui/core";

import AccountDetails from "./components/AccountDetails";

import Layout from "~/layout/Layout";
import AccountProfile from "./components/AccountProfile";

const Account = () => {
  return (
    <Layout>
      <Grid container spacing={4}>
        <Grid item lg={4} md={6} xl={4} xs={12}>
          <AccountProfile />
        </Grid>
        <Grid item lg={8} md={6} xl={8} xs={12}>
          <AccountDetails />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Account;
