/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import RootTopBar from "./components/RootTopBar";
import RootHero from "./components/RootHero";
import { Container, Typography, Grid } from "@material-ui/core";
import { useStyles } from "./rootPage.styles";

import { LeaguesSkeleton } from "./components/LeaguesSkeleton";
import Footer from "~/components/Footer/Footer";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import FeedbackActions from "~/redux/ducks/feedbackDuck";
import api from "~/services/api";
import { LeaguesItem } from "./components/LeaguesItem";

function RootPage({ setFeedback }) {
  const [leagues, setLeagues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLeagues();
  }, []);

  const getLeagues = async () => {
    try {
      const { data } = await api.get("/league/all");
      setLeagues(data.items);
      setLoading(false);
    } catch (err) {
      if (err.response && err.response.status < 500) {
        return setFeedback("error", err.response.data.message);
      }
      return setFeedback("error", "Ops! Algo de errado aconteceu ao tentar");
    }
  };

  const classes = useStyles();
  return (
    <>
      <RootTopBar />
      <RootHero />
      <Container maxWidth="md" className={classes.container}>
        <Typography align="center" variant="h4" className={classes.h4}>
          Campeonatos Abertos
        </Typography>
        <Grid container component="main" spacing={3}>
          {loading ? (
            <LeaguesSkeleton />
          ) : (
            <LeaguesItem leagues={leagues} classes={classes} />
          )}
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

const mapActionsToProps = (dispatch) =>
  bindActionCreators(FeedbackActions, dispatch);

export default connect(null, mapActionsToProps)(RootPage);
