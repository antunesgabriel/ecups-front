import React, { useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  makeStyles,
  Container,
  LinearProgress,
} from "@material-ui/core";

import api, { APIURL } from "~/services/api";

import { TeamDetails } from "./TeamDetails";
import { TeamShield } from "./TeamShield";
import { connect } from "react-redux";
import UserActions from "~/redux/ducks/userDuck";
import FeedbackActions from "~/redux/ducks/feedbackDuck";
import { bindActionCreators } from "redux";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  margin: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

function getStepContent(
  step,
  handleChange,
  team,
  classes,
  handleChangeShield,
  shield,
  handleRemove
) {
  switch (step) {
    case 0:
      return (
        <TeamDetails
          handleChange={handleChange}
          team={team}
          subtitle="Escolha um nome e uma descrição para seu time"
          className={classes.margin}
        />
      );
    case 1:
      return (
        <TeamShield
          team={team}
          handleChangeShield={handleChangeShield}
          shield={shield}
          handleRemove={handleRemove}
          className={classes.margin}
        />
      );
    case 2:
      return <p className={classes.margin}>Deseja realmente criar o time ?</p>;
    default:
      return "Unknown step";
  }
}

function TeamCreateSteps({ setFeedback, setUserTeam }) {
  const [team, setTeam] = useState({ team: "", bio: "" });
  const [teamShield, setTeamShield] = useState({ shield: null });
  const [loading, setLoading] = useState(true);
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());

  const classes = useStyles();
  const steps = ["Nome e Descrição", "Escudo", "Confimar"];

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleComfirm = () => {
    handleSave();
    handleNext();
  };

  const handleChangeShield = (e) => {
    setTeamShield({
      shield: e.target.files[0],
    });
  };

  const handleRemoveShield = () => {
    // async remove
    // async get team
  };

  const handleChange = (e) => {
    setTeam({
      ...team,
      [e.target.name]: e.target.value,
    });
  };

  const handleReset = () => {
    setTeam({
      ...team,
      team: "",
    });
    setTeamShield({ shield: null });
    setActiveStep(0);
    setLoading(false);
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const { data } = await api.post(`${APIURL}/team`, team);

      if (teamShield.shield) {
        const formData = new FormData();
        formData.append("shield", teamShield.shield, teamShield.shield.name);
        const {
          data: { filename },
        } = await api.put(
          `${APIURL}/team-shield/${data.team.teamId}`,
          formData
        );
        setFeedback("success", data.message);
        setUserTeam({ ...data.team, shield: filename });
        setLoading(false);
        return;
      }
      setUserTeam(data.team);
      setFeedback("success", data.message);
      setLoading(false);
    } catch (err) {
      handleReset();
      if (err.response && err.response.statusCode < 500) {
        setFeedback("error", err.response.message);
        return;
      }
      setFeedback("error", "Falha ao obter dados");
      return;
    }
  };

  return (
    <Container maxWidth="sm">
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              <LinearProgress />
            </Typography>
          </div>
        ) : (
          <div>
            <main>
              {getStepContent(
                activeStep,
                handleChange,
                team,
                classes,
                handleChangeShield,
                teamShield,
                handleRemoveShield
              )}
            </main>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
              >
                Voltar
              </Button>
              {activeStep === steps.length - 1 ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleComfirm}
                  className={classes.button}
                >
                  Sim
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  className={classes.button}
                  disabled={(activeStep === 0 && !team.team) || !team.bio}
                >
                  Próximo
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}

const mapActionsToProps = (dispatch) =>
  bindActionCreators({ ...UserActions, ...FeedbackActions }, dispatch);

export default connect(null, mapActionsToProps)(TeamCreateSteps);
