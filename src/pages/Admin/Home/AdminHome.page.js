/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import Layout from "~/layout/Layout";
import Board from "~/components/Board/Board";
import PeopleIcon from "@material-ui/icons/PeopleOutlined";
import SportsEsportsIcon from "@material-ui/icons/SportsEsports";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import api from "~/services/api";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import FeedbackActions from "~/redux/ducks/feedbackDuck";
import LastUsers from "./components/LastUsers";

const AdminHomePage = ({ setFeedback }) => {
  const [items, setItems] = useState(null);

  useEffect(() => {
    getItems();
  }, []);

  async function getItems() {
    try {
      const { data } = await api.get("/admin/home");
      setItems({ ...data });
    } catch (err) {
      if (err.response && err.response.status < 500) {
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
            icon={PersonAddIcon}
            title="Novos usuários"
            describe="Nos ultimos 30 dias"
            value={items ? items.userInfo.actual : 0}
            porcentage={items ? items.userInfo.porcentage : false}
            up={items && items.userInfo.actual > items.userInfo.before}
          />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <Board
            icon={SportsEsportsIcon}
            title="Novas Ligas"
            describe="Nos ultimos 30 dias"
            porcentage={items ? items.leagueInfo.porcentage : false}
            value={items ? items.leagueInfo.actual : 0}
            up={items && items.leagueInfo.actual > items.leagueInfo.before}
          />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <Board
            icon={PeopleIcon}
            title="Total de usuários"
            describe="Usuarios ativos"
            value={items ? items.userInfo.total : 0}
          />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <Board
            icon={AccountTreeIcon}
            describe="Ligas criadas"
            title="Total de ligas"
            value={items ? items.leagueInfo.total : 0}
          />
        </Grid>
        <Grid item lg={12} sm={12} xl={12} xs={12}>
          <LastUsers users={items ? items.userInfo.users : []} />
        </Grid>
      </Grid>
    </Layout>
  );
};
const mapActionsToProps = (dispatch) =>
  bindActionCreators(FeedbackActions, dispatch);
export const AdminHome = connect(null, mapActionsToProps)(AdminHomePage);
