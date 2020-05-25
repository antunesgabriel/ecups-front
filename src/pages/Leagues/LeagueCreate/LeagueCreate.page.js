/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import MUIRichTextEditor from "mui-rte";
import {
  CircularProgress,
  Grid,
  TextField,
  Button,
  Slider,
  Select,
  withStyles,
  Backdrop,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Container,
  Paper,
  FormHelperText,
  FormControl,
  FormGroup,
  FormControlLabel,
  FormLabel,
  InputLabel,
  Switch,
} from "@material-ui/core";
import { DateTimePicker } from "@material-ui/pickers";
import { bindActionCreators } from "redux";
import { parseISO, addHours, addDays } from "date-fns";

import FeedbackActions from "~/redux/ducks/feedbackDuck";
import Layout from "~/layout/Layout";
import api from "~/services/api";
import { textToHtml } from "~/helpers/html";

import { useStyles } from "./leagueCreate.styles";
import { Thumb } from "./Thumb";

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

const MySlider = withStyles({
  track: {
    height: 4,
    borderRadius: 2,
  },
  rail: {
    height: 4,
    borderRadius: 2,
  },
  mark: {
    height: 0,
  },
  thumb: {
    height: 15,
    width: 15,
    marginTop: -5,
  },
})(Slider);

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
                          <Grid container spacing={3}>
                            <Grid item md={12} xs={12} lg={12} xl={12}>
                              <TextField
                                fullWidth
                                label="Liga"
                                helperText="Nome da liga"
                                size="medium"
                                margin="dense"
                                name="league"
                                onChange={handleChangeText}
                                required
                                value={values.league}
                                variant="standard"
                              />
                            </Grid>

                            <Grid item md={12} xs={12} lg={12} xl={12}>
                              <Typography>Descrição:</Typography>
                              <MUIRichTextEditor
                                label="Clique no icone salvar para salvar o conteudo..."
                                name="description"
                                // readOnly
                                // toolbar={false}
                                defaultValue={textToHtml(values.description)}
                                inlineToolbar={true}
                                onSave={(data) =>
                                  handleSaveRTE("description", data)
                                }
                                controls={[
                                  "title",
                                  "bold",
                                  "italic",
                                  "underline",
                                  "strikethrough",
                                  "highlight",
                                  "link",
                                  "bulletList",
                                  "numberList",
                                  "save",
                                ]}
                              />
                              <FormHelperText>
                                Digite a descrição do campeonato{" "}
                                <b>E CLIQUE NO ICONE SALVAR</b>
                              </FormHelperText>
                            </Grid>

                            <Grid item md={12} xs={12} lg={12} xl={12}>
                              <Typography>Regras:</Typography>
                              <MUIRichTextEditor
                                label="Clique no icone salvar para salvar o conteudo..."
                                name="rules"
                                defaultValue={textToHtml(values.rules)}
                                inlineToolbar={true}
                                onSave={(data) => handleSaveRTE("rules", data)}
                                controls={[
                                  "title",
                                  "bold",
                                  "italic",
                                  "underline",
                                  "strikethrough",
                                  "highlight",
                                  "link",
                                  "bulletList",
                                  "numberList",
                                  "save",
                                ]}
                              />
                              <FormHelperText>
                                Digite as regras do campeonato{" "}
                                <b>E CLIQUE NO ICONE SALVAR</b>
                              </FormHelperText>
                            </Grid>

                            <Grid item md={12} xs={12} lg={12} xl={12}>
                              <FormControl component="fieldset">
                                <FormLabel component="legend">
                                  Configurações
                                </FormLabel>
                                <FormGroup>
                                  <FormControlLabel
                                    control={
                                      <Switch
                                        checked={!!values.needAddress}
                                        onChange={handleChangeChecked}
                                        name="needAddress"
                                        color="primary"
                                      />
                                    }
                                    label="Solicitar endereço dos player na inscrição"
                                  />
                                  <FormControlLabel
                                    control={
                                      <Switch
                                        checked={!!values.roundTrip}
                                        onChange={handleChangeChecked}
                                        name="roundTrip"
                                        color="primary"
                                      />
                                    }
                                    label="Ativar jogo de ida e volta"
                                  />
                                  <FormControlLabel
                                    control={
                                      <Switch
                                        checked={!!values.forTeams}
                                        onChange={handleChangeChecked}
                                        name="forTeams"
                                        color="primary"
                                        disabled={edited}
                                      />
                                    }
                                    label="Somente para times"
                                  />
                                </FormGroup>
                              </FormControl>
                            </Grid>

                            <Grid item md={6} xs={12} lg={12} xl={12}>
                              <FormControl
                                component="fieldset"
                                className={classes.control}
                              >
                                <Typography gutterBottom component="label">
                                  N. máximo de Participantes
                                </Typography>

                                <MySlider
                                  aria-labelledby="participants-slider"
                                  step={1}
                                  marks
                                  name="maxParticipants"
                                  valueLabelDisplay={edited ? "on" : "auto"}
                                  onChange={handleChangeSlider}
                                  value={values.maxParticipants}
                                  min={1}
                                  max={1000}
                                  id="maxParticipants"
                                />
                              </FormControl>
                            </Grid>

                            <Grid item md={6} xs={12} lg={6} xl={6}>
                              <FormControl
                                component="fieldset"
                                className={classes.control}
                              >
                                <DateTimePicker
                                  label="Inicio da Liga"
                                  inputvariant="standard"
                                  value={parseISO(values.leagueStart)}
                                  onChange={handleStartDateChange}
                                  name="leagueStart"
                                />
                              </FormControl>
                            </Grid>

                            <Grid item md={6} xs={12} lg={6} xl={6}>
                              <FormControl
                                component="fieldset"
                                className={classes.control}
                              >
                                <DateTimePicker
                                  label="Fim da Liga"
                                  helperText="Deixe vazio para fim indeterminado"
                                  inputvariant="standard"
                                  value={
                                    values.leagueEnd
                                      ? parseISO(values.leagueEnd)
                                      : null
                                  }
                                  onChange={handleEndDateChange}
                                  name="leagueEnd"
                                />
                              </FormControl>
                            </Grid>

                            <Grid item md={6} xs={12} lg={6} xl={6}>
                              <FormControl
                                variant="standard"
                                className={classes.control}
                              >
                                <InputLabel htmlFor="gameId">Game</InputLabel>
                                <Select
                                  native
                                  id="gameId"
                                  value={values.gameId}
                                  onChange={handleChangeSelect}
                                  label="Game"
                                  fullWidth
                                  name="gameId"
                                  disabled={edited}
                                >
                                  <option aria-label="None" value="" />
                                  {games.map((game) => (
                                    <option
                                      key={`game-${game.gameId}`}
                                      value={game.gameId}
                                    >
                                      {game.game}
                                    </option>
                                  ))}
                                </Select>
                                <FormHelperText>
                                  Game do campeonato
                                </FormHelperText>
                              </FormControl>
                            </Grid>

                            <Grid
                              item
                              md={6}
                              xs={12}
                              lg={6}
                              xl={6}
                              className={classes.control}
                            >
                              <FormControl variant="standard">
                                <InputLabel htmlFor="outlined-age-native-simple">
                                  Tipo
                                </InputLabel>
                                <Select
                                  native
                                  value={values.leagueTypeId}
                                  onChange={handleChangeSelect}
                                  label="Tipo"
                                  name="leagueTypeId"
                                  fullWidth
                                  disabled={edited}
                                >
                                  <option aria-label="None" value="" />
                                  {leagueTypes.map((type) => (
                                    <option
                                      key={`type-${type.leagueTypeId}`}
                                      value={type.leagueTypeId}
                                    >
                                      {type.type}
                                    </option>
                                  ))}
                                </Select>
                                <FormHelperText>
                                  Tipo da liga/campeonato (Exe: mata-mata,
                                  copa...)
                                </FormHelperText>
                              </FormControl>
                            </Grid>
                          </Grid>
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
