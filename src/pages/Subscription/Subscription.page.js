/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Grid } from "@material-ui/core";

import Layout from "~/layout/Layout";

import Subscriptions from "./components/Subscriptions";
import Requests from "./components/Requests";

function SubscriptionPage() {
  return (
    <Layout>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Requests />
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Subscriptions />
        </Grid>
      </Grid>
    </Layout>
  );
}

export default SubscriptionPage;
