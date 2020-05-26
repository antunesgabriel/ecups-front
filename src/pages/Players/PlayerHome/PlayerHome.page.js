/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import Layout from "~/layout/Layout";
import Board from "~/components/Board/Board";
import GroupIcon from "@material-ui/icons/Group";
import SportsEsportsIcon from "@material-ui/icons/SportsEsports";
import GamepadIcon from "@material-ui/icons/Gamepad";
import GradeIcon from "@material-ui/icons/Grade";
// import api from "~/services/api";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import FeedbackActions from "~/redux/ducks/feedbackDuck";
import api from "~/services/api";

const PlayerHomePage = ({ setFeedback }) => {
  const [items, setItems] = useState(null);

  useEffect(() => {
    (async function () {
      await getItems();
    })();
  }, []);

  async function getItems() {
    try {
      const { data } = await api.get("/player-home");
      setItems(data);
    } catch (err) {
      if (err.response && err.response.statusCode < 500) {
        setFeedback("error", err.response.message);
        return;
      }
      setFeedback("error", "Falha ao obter dados");
      return;
    }
  }

  return (
    <Layout>
      <Grid container spacing={4}>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <Board
            icon={SportsEsportsIcon}
            title="Participações"
            describe="Quantidade de ligas/campeonatos que já participou ou está participando"
            value={items ? items.participations : 0}
            porcentage={false}
            up={false}
          />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <Board
            icon={GamepadIcon}
            title="Minhas Ligas"
            describe="Quantidades de ligas que criou/gerenciou"
            porcentage={false}
            value={items ? items.leaguesCount : 0}
            up={false}
          />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <Board
            icon={GradeIcon}
            title="Vitórias Solo"
            describe="Total de vitórias solo em ligas/campeonatos"
            value="Em breve"
          />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <Board
            icon={GroupIcon}
            title="Vitórias em time"
            describe="Total de vitórias em time em ligas/campeonatos"
            value="Em breve"
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
