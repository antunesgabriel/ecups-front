/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import Layout from "~/layout/Layout";
import Board from "~/components/Board/Board";
import GroupIcon from "@material-ui/icons/Group";
import SportsEsportsIcon from "@material-ui/icons/SportsEsports";
import GamepadIcon from "@material-ui/icons/Gamepad";
import GradeIcon from "@material-ui/icons/Grade";
import api from "~/services/api";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import FeedbackActions from "~/redux/ducks/feedbackDuck";

const PlayerHomePage = ({ setFeedback }) => {
  const [items, setItems] = useState(null);

  // useEffect(() => {}, []);

  // async function getItems() {
  //   try {
  //     const { data } = await api.get("/admin/home");
  //     setItems({ ...data });
  //   } catch (err) {
  //     if (err.response && err.response.statusCode < 500) {
  //       setFeedback("error", err.response.message);
  //       return;
  //     }
  //     setFeedback("error", "Falha ao obter dados");
  //     return;
  //   }
  // }

  return (
    <Layout>
      <Grid container spacing={4}>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <Board
            icon={SportsEsportsIcon}
            title="Participações"
            describe="Quantidade de ligas/campeonatos que já participou ou está participando"
            value={items ? items.userInfo.actual : 0}
            porcentage={items ? items.userInfo.porcentage : false}
            up={items && items.userInfo.actual > items.userInfo.before}
          />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <Board
            icon={GamepadIcon}
            title="Minhas Ligas"
            describe="Quantidades de ligas que criou/gerenciou"
            porcentage={items ? items.leagueInfo.porcentage : false}
            value={items ? items.leagueInfo.actual : 0}
            up={items && items.leagueInfo.actual > items.leagueInfo.before}
          />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <Board
            icon={GradeIcon}
            title="Vitórias Solo"
            describe="Total de vitórias solo em ligas/campeonatos"
            value={items ? items.userInfo.total : 0}
          />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <Board
            icon={GroupIcon}
            title="Vitórias em time"
            describe="Total de vitórias em time em ligas/campeonatos"
            value={items ? items.leagueInfo.total : 0}
          />
        </Grid>
        {/* <Grid item lg={12} sm={12} xl={12} xs={12}>
          <LastUsers users={items ? items.userInfo.users : []} />
        </Grid> */}
      </Grid>
    </Layout>
  );
};
const mapActionsToProps = (dispatch) =>
  bindActionCreators(FeedbackActions, dispatch);
export default connect(null, mapActionsToProps)(PlayerHomePage);
