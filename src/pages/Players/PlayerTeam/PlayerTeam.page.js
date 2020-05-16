/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Grid } from "@material-ui/core";
import { connect } from "react-redux";

import Layout from "~/layout/Layout";

import TeamCreateSteps from "./components/TeamCreateSteps";
import TeamShow from "./components/TeamShow";

function PlayerTeamPage({ team }) {
  return (
    <Layout>
      <Grid container spacing={3}>
        <Grid item md={12} xs={12}>
          {team ? <TeamShow team={team} /> : <TeamCreateSteps />}
        </Grid>
      </Grid>
    </Layout>
  );
}

const mapStateToProps = (state) => ({
  team: state.user.user.team,
});

export default connect(mapStateToProps)(PlayerTeamPage);
