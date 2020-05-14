import React from "react";
import { Grid } from "@material-ui/core";

import PerfilDetails from "./components/PerfilDetails";

import Layout from "~/layout/Layout";
import PerfilProfile from "./components/PerfilProfile";

const Perfil = () => {
  return (
    <Layout>
      <Grid container spacing={4}>
        <Grid item lg={4} md={6} xl={4} xs={12}>
          <PerfilProfile />
        </Grid>
        <Grid item lg={8} md={6} xl={8} xs={12}>
          <PerfilDetails />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Perfil;
