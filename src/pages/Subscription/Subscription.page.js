/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import {
  Grid,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Backdrop,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Layout from "~/layout/Layout";

import { useStyles } from "./subiscription.styles";
import MeusPedidos from "./components/MeusPedidos";
import OutroPedidos from "./components/OutroPedidos";
import FeedbackActions from "~/redux/ducks/feedbackDuck";
import api from "~/services/api";

function SubscriptionPage({ location, setFeedback }) {
  const [leagueId, setLeagueId] = useState(
    new URLSearchParams(location.search).get("leagueId")
  );
  const [league, setLeague] = useState(null);
  const [loading, setLoading] = useState(false);
  const [meusPedidos, setMeusPedidos] = useState([]);

  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    async function init() {
      const { league } = await getLeague();
      if (league) {
        setLeague(league);
        setLoading(false);
        setLeagueId(null);
        return;
      }
      setLeague(null);
      setLoading(false);
      setLeagueId(null);
    }
    if (leagueId) {
      init();
    }
  }, []);

  const handleClose = () => {
    setLeague(null);
    setLeagueId(null);
    history.push("/player/subscriptions");
  };

  const getLeague = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`/league/all?leagueId=${leagueId}`);
      return data;
    } catch (err) {
      if (err.response && err.response.status < 500) {
        setFeedback("error", err.response.data.message);
        history.push("/player/subscriptions");
        return false;
      }
      setFeedback("error", "Ops! Algo de errado aconteceu ao tentar");
      history.push("/player/subscriptions");
      return false;
    }
  };

  const handleAccept = async () => {
    try {
      setLoading(true);
      const { data } = await api.post("/subscription", {
        leagueId,
      });
      setLeagueId(null);
      setLeague(null);
      setFeedback("success", data.message);
      history.push("/player/subscriptions");
    } catch (err) {
      if (err.response && err.response.status < 500) {
        setFeedback("error", err.response.data.message);
      }

      if (err.response.status >= 500) {
        setFeedback("error", "Ops! Algo de errado aconteceu ao tentar");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Container maxWidth="md">
        <Backdrop
          className={classes.backdrop}
          open={loading}
          onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        {!!league && (
          <Dialog
            open={!!league}
            onClose={handleClose}
            aria-labelledby="alert-dialog-subscription"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              Solicitar participação na liga {league.league}
            </DialogTitle>
            <DialogContent>
              <Typography
                variant="subtitle2"
                color="textPrimary"
                className={classes.marginLabel}
              >
                Descrição da Liga:
              </Typography>
              <DialogContentText id="info">
                {league.description}
              </DialogContentText>
              <Typography
                variant="subtitle2"
                color="textPrimary"
                className={classes.marginLabel}
              >
                Regras da Liga:
              </Typography>
              <DialogContentText id="regras">
                {league.rules
                  ? league.rules
                  : "Não foi definida regras para essa liga"}
              </DialogContentText>
              <DialogContentText id="regras">
                Está liga é entre {league.forTeams ? "TIMES" : "PLAYERS"}
              </DialogContentText>
              <DialogContentText id="alert" variant="caption">
                Ao clicar em <b>ACEITAR E ENVIAR PEDIDO</b>, um pedido de
                participação irá ser enviado ao organizador da liga. Ele poderá
                aceitar ou não seu pedido de inscrição. Você pode acompanhar o
                status do seu pedido aqui nesta página.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="default">
                Cancelar
              </Button>
              <Button onClick={handleAccept} color="primary">
                Aceitar e Enviar pedido
              </Button>
            </DialogActions>
          </Dialog>
        )}
        {!loading && (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <OutroPedidos />
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12}>
              <MeusPedidos meusPedidos={meusPedidos} classes={classes} />
            </Grid>
          </Grid>
        )}
      </Container>
    </Layout>
  );
}

const mapActionsToProps = (dispatch) =>
  bindActionCreators(FeedbackActions, dispatch);

export default connect(null, mapActionsToProps)(SubscriptionPage);
