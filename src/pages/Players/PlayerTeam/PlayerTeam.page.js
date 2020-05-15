/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Grid } from "@material-ui/core";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Layout from "~/layout/Layout";
import FeedbackActions from "~/redux/ducks/feedbackDuck";
import TeamCreateSteps from "./component/TeamCreateSteps";
import { TeamShow } from "./component/TeamShow";

function PlayerTeamPage({ team }) {
  return (
    <Layout>
      <Grid container spacing={3}>
        <Grid item md={12} xs={12}>
          {team ? <TeamShow team={team} /> : <TeamCreateSteps />}
        </Grid>

        {/* <Grid item md={6} xs={12}>
          criar time aqui
        </Grid>

        <Grid item md={6} xs={12}>
          criar time aqui
        </Grid> */}
      </Grid>
    </Layout>
  );
}

const mapActionsToProps = (dispatch) =>
  bindActionCreators(FeedbackActions, dispatch);

const mapStateToProps = (state) => ({
  team: state.user.user.team,
});

export default connect(mapStateToProps, mapActionsToProps)(PlayerTeamPage);
