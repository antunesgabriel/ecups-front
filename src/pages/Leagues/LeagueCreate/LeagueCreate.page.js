/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import {
  CircularProgress,
  Grid,
  Button,
  Backdrop,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Container,
  Paper,
} from "@material-ui/core";

import { bindActionCreators } from "redux";
import { addHours, addDays } from "date-fns";

import FeedbackActions from "~/redux/ducks/feedbackDuck";
import Layout from "~/layout/Layout";
import api from "~/services/api";

import { useStyles } from "./leagueCreate.styles";
import { Thumb } from "./Thumb";
import { LeagueForm } from "./LeagueForm";

function getSteps() {
  return ["Informações", "Capa", "Finalizar"];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return "Adcione as informações referente a liga...";
    case 1:
      return "Adcione uma imagem como capa da liga";
    case 2:
      return "Deseja realmente salvar as informações ?";
    default:
      return "Unknown stepIndex";
  }
}

function LeagueCreatePage({ setFeedback, role }) {
  const [thumb, setThumb] = useState(null);
  const [games, setGames] = useState([]);
  const [leagueId, setLeagueId] = useState(null);
  const [leagueTypes, setLeagueTypes] = useState([]);
  const [edited, setEdited] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeStep, setActiveStep] = useState(0);
  const [values, setValues] = useState({
    league: "",
    rules: "",
    description: "",
    roundTrip: "",
    forTeams: "",
    maxParticipants: 2,
    leagueStart: addHours(new Date(), 1).toISOString(),
    leagueEnd: addDays(new Date(), 7).toISOString(),
    needAddress: false,
    leagueTypeId: undefined,
    gameId: undefined,
  });

  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();
  const steps = getSteps();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    (async function () {
      await setGameAndTypes();
      if (query.has("leagueId")) {
        const league = await getLeagueById(query.get("leagueId"));
        if (league) {
          setValues({
            league: league.league,
            rules: league.rules,
            description: league.description,
            roundTrip: league.roundTrip,
            forTeams: league.forTeams,
            maxParticipants: league.maxParticipants,
            leagueStart: league.leagueStart,
            leagueEnd: league.leagueEnd,
            needAddress: league.needAddress,
            leagueTypeId: league.leagueType.leagueTypeId,
            gameId: league.game.gameId,
          });
          setThumb(league.thumb);
          setEdited(true);
          setLeagueId(league.leagueId);
        }
      }
      setLoading(false);
    })();
  }, []);

  // Connect
  const getLeagueById = async (leagueId) => {
    try {
      const { data } = await api.get(`/league/show/${leagueId}`);
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

  const setGameAndTypes = async () => {
    try {
      const [response1, response2] = await Promise.all([
        api.get("/game/all"),
        api.get("/league-type/all"),
      ]);

      if (!response1.data.length || !response2.data.length) {
        throw new Error("Ainda não é possivel criar ligas, em breve =D");
      }

      setGames(response1.data);
      setLeagueTypes(response2.data);
    } catch (err) {
      if (err.response && err.response.status < 500) {
        setFeedback("error", err.response.data.message);
      }

      if (!err.response) {
        setFeedback("warning", err.message);
      }

      if (err.response.status >= 500) {
        setFeedback(
          "error",
          "Ops! Algo de errado aconteceu ao tentar se comunicar com o servidor"
        );
      }

      history.push(`/${role.role.toLowerCase()}/home`);
    }
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);
      if (typeof thumb !== "string" && thumb) {
        const formData = new FormData();
        formData.append("thumb", thumb, thumb.name);
        await api.put(`/league-thumb/${leagueId}`, formData);
      }
      const { data } = await api.put(`/league/${leagueId}`, values);
      setFeedback("success", data.message);
      history.push(`/${role.role.toLowerCase()}/leagues`);
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
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    try {
      setLoading(true);
      const { data } = await api.post("/league/", values);

      if (typeof thumb !== "string" && thumb) {
        const formData = new FormData();
        formData.append("thumb", thumb, thumb.name);
        await api.put(`/league-thumb/${data.league.leagueId}`, formData);
      }

      setFeedback("success", data.message);

      history.push(`/${role.role.toLowerCase()}/leagues`);
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
      setLoading(false);
    }
  };

  // Manipule
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSaveRTE = (name, data) => {
    setValues({
      ...values,
      [name]: data,
    });
  };

  const handleChangeThumb = (e) => {
    setThumb(e.target.files[0]);
  };

  const handleChangeText = (e) =>
    setValues({ ...values, [e.target.name]: e.target.value });

  const handleChangeChecked = (e) =>
    setValues({ ...values, [e.target.name]: e.target.checked });

  const handleDate = (key, date) => {
    setValues({ ...values, [key]: date.toISOString() });
  };

  const handleStartDateChange = (date) => handleDate("leagueStart", date);
  const handleEndDateChange = (date) => handleDate("leagueEnd", date);

  const handleChangeSlider = (event, newValue) =>
    setValues({
      ...values,
      maxParticipants: Number(newValue),
    });

  const handleChangeSelect = (e) =>
    setValues({
      ...values,
      [e.target.name]: +e.target.value,
    });

  return (
    <Layout>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Container maxWidth="sm">
        <Grid container spacing={3}>
          <Grid item md={12} xs={12}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <div>
              {activeStep === steps.length ? (
                <div>
                  <Typography className={classes.instructions}>
                    Informações salvas com sucesso!
                  </Typography>
                </div>
              ) : (
                <div>
                  <div className={classes.content}>
                    <Typography>{getStepContent(activeStep)}</Typography>
                    {activeStep < 2 && (
                      <Paper className={classes.paper}>
                        {activeStep === 0 && (
                          <LeagueForm
                            classes={classes}
                            values={values}
                            handleChangeText={handleChangeText}
                            handleSaveRTE={handleSaveRTE}
                            handleChangeChecked={handleChangeChecked}
                            edited={edited}
                            handleChangeSlider={handleChangeSlider}
                            handleStartDateChange={handleStartDateChange}
                            handleEndDateChange={handleEndDateChange}
                            handleChangeSelect={handleChangeSelect}
                            games={games}
                            leagueTypes={leagueTypes}
                          />
                        )}
                        {activeStep === 1 && (
                          <Thumb
                            thumb={thumb}
                            handleChangeThumb={handleChangeThumb}
                            league={values.league}
                          />
                        )}
                      </Paper>
                    )}
                  </div>
                  <div>
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className={classes.backButton}
                    >
                      Voltar
                    </Button>

                    <Button
                      variant="text"
                      onClick={handleNext}
                      className={classes.backButton}
                      disabled={activeStep === steps.length - 1}
                    >
                      Próximo
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={edited ? handleUpdate : handleCreate}
                    >
                      Salvar
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
}

const mapActionsToProps = (dispatch) =>
  bindActionCreators(FeedbackActions, dispatch);

const mapStateToProps = (state) => ({
  role: state.user.user.role,
});

export default connect(mapStateToProps, mapActionsToProps)(LeagueCreatePage);
