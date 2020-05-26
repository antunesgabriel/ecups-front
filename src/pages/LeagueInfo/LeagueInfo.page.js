/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import MUIRichTextEditor from "mui-rte";
import {
  Typography,
  Paper,
  Container,
  Tabs,
  Tab,
  Box,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { useLocation, useHistory } from "react-router-dom";
import { parseISO, differenceInDays, format } from "date-fns";
import { bindActionCreators } from "redux";
import FeedbackActions from "~/redux/ducks/feedbackDuck";
import { connect } from "react-redux";

import RootTopBar from "../Root/components/RootTopBar";
import api, { APIURL } from "~/services/api";
import { textToHtml } from "~/helpers/html";

import { useStyles } from "./leagueInfo.styles";
import { Skeleton } from "@material-ui/lab";

const getDays = (date) => {
  const days = differenceInDays(parseISO(date), new Date());

  if (!days) {
    return `Começa hoje ás ${format(parseISO(date), "H:m")}hrs`;
  }
  return `Faltam ${days} ${days > 1 ? "dias" : "dia"} para o inicio desta liga`;
};

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

function LeagueInfoPage({ setFeedback, signed }) {
  const [league, setLeague] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingSubscribe, setLoadingSubscribe] = useState(false);
  const [tab, setTab] = useState(0);

  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    async function init(id) {
      const data = await getLeague(id);
      if (data) {
        setLeague(data);
        setLoading(false);
        return;
      }
      setLoading(false);
      history.push("/");
    }

    if (query.has("leagueId")) {
      init(query.get("leagueId"));
      return;
    }
    setLoading(false);
    history.push("/");
  }, []);

  const getLeague = async (leagueId) => {
    try {
      const { data } = await api.get(`/league/all?leagueId=${leagueId}`);
      return data.league;
    } catch (err) {
      if (err.response && err.response.status < 500) {
        setFeedback("error", err.response.data.message);
      }

      if (!err.response || err.response.status >= 500) {
        setFeedback(
          "error",
          "Ops! Algo de errado aconteceu ao tentar se comunicar com o servidor"
        );
      }

      return null;
    }
  };

  const handleChangeTab = (event, newValue) => {
    setTab(newValue);
  };

  const subscribe = async () => {
    try {
      setLoadingSubscribe(true);
      const { data } = await api.post("/subscription", {
        leagueId: league.leagueId,
      });
      setFeedback("info", data.message);
      history.push("/player/subscriptions");
    } catch (err) {
      if (err.response && err.response.status < 500) {
        setFeedback("error", err.response.data.message);
      }

      if (!err.response || err.response.status >= 500) {
        setFeedback(
          "error",
          "Ops! Algo de errado aconteceu ao tentar se comunicar com o servidor"
        );
      }
    } finally {
      setLoadingSubscribe(false);
    }
  };

  const login = () => {
    const state = { from: location };

    history.push("/player/signin", state);
  };

  return (
    <>
      <RootTopBar />
      <Paper className={classes.root}>
        {!!league && (
          <div className={classes.image}>
            <span
              className={classes.imageSrc}
              style={{
                backgroundImage: `url(${APIURL}/files/${
                  league.thumb || league.game.logo
                })`,
              }}
            />
            <Typography
              component="h1"
              color="inherit"
              className={classes.league}
              variant="h1"
            >
              {league.league}
            </Typography>
            <Typography
              component="h5"
              color="inherit"
              variant="subtitle1"
              className={classes.show}
            >
              {getDays(league.leagueStart)}
            </Typography>
            <Typography
              component="p"
              color="inherit"
              variant="body2"
              className={classes.show}
            >
              Organizado por: @{league.user.nickname}
            </Typography>
            <span className={classes.imageBackdrop} />
          </div>
        )}
      </Paper>
      <Container maxWidth="md">
        <Paper component="main" className={classes.paper}>
          <Paper square elevation={0}>
            <Tabs
              value={tab}
              onChange={handleChangeTab}
              aria-label="tabs de detalhes"
              indicatorColor="primary"
              textColor="primary"
            >
              <Tab label="Descrição" />
              <Tab label="Regras" />
              <Tab label="Inscrição" />
            </Tabs>
          </Paper>
          <TabPanel value={tab} index={0}>
            {loading ? (
              <Skeleton height={200} width="100%" />
            ) : (
              <MUIRichTextEditor
                label="O organizador não deixou uma descrição..."
                readOnly
                toolbar={false}
                defaultValue={textToHtml(league.description)}
                inlineToolbar={true}
              />
            )}
          </TabPanel>
          <TabPanel value={tab} index={1}>
            {loading ? (
              <Skeleton height={200} width="100%" />
            ) : (
              <MUIRichTextEditor
                label="O organizador não deixou regras escritas aqui..."
                readOnly
                toolbar={false}
                defaultValue={textToHtml(league.rules)}
                inlineToolbar={true}
              />
            )}
          </TabPanel>
          <TabPanel value={tab} index={2}>
            {loading ? (
              <>
                <Skeleton width="100%" variant="text" />
                <Skeleton width="100%" variant="text" />
                <Skeleton width="100%" variant="text" />
                <Skeleton width="100%" variant="text" />
                <Skeleton width="100%" variant="text" />
                <Skeleton width="100%" variant="text" />
              </>
            ) : (
              <>
                <Typography
                  component="p"
                  variant="body1"
                  className={classes.margin}
                >
                  <b className={classes.right}>Data inicio da liga:</b>
                  {format(
                    parseISO(league.leagueStart),
                    "dd/MM/Y 'ás' H:mm'hrs'"
                  )}
                </Typography>
                <Typography
                  component="p"
                  variant="body1"
                  className={classes.margin}
                >
                  <b className={classes.right}>Data fim da liga:</b>
                  {league.leagueEnd
                    ? format(
                        parseISO(league.leagueEnd),
                        "dd/MM/Y 'ás' H:mm'hrs'"
                      )
                    : "Não definida"}
                </Typography>
                <Typography
                  component="p"
                  variant="body1"
                  className={classes.margin}
                >
                  <b className={classes.right}>Disputa entre:</b>
                  {league.forTeams ? "Times" : "Players"}
                </Typography>

                <Typography
                  component="p"
                  variant="body1"
                  className={classes.margin}
                >
                  <b className={classes.right}>Jogo de ida e volta:</b>
                  {league.roundTrip ? "Sim" : "Não"}
                </Typography>

                <Typography
                  component="p"
                  variant="subtitle2"
                  className={classes.margin}
                >
                  Clique em <b>SOLICITAR INSCRIÇÃO</b> e aguarde o organizador
                  aceitar ou recusar sua entrada na liga
                </Typography>

                {signed ? (
                  <Button
                    variant="outlined"
                    className={classes.subscribe}
                    onClick={subscribe}
                    disabled={loadingSubscribe}
                  >
                    {loadingSubscribe ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : (
                      "Solicitar Inscrição"
                    )}
                  </Button>
                ) : (
                  <Button variant="outlined" onClick={login}>
                    Fazer login
                  </Button>
                )}
              </>
            )}
          </TabPanel>
        </Paper>
      </Container>
    </>
  );
}

const mapStateToProps = (state) => ({
  signed: state.auth.signed,
});

const mapActionsToProps = (dispatch) =>
  bindActionCreators(FeedbackActions, dispatch);

export default connect(mapStateToProps, mapActionsToProps)(LeagueInfoPage);
