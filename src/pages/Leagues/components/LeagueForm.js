/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import {
  TextField,
  FormGroup,
  FormLabel,
  Typography,
  withStyles,
} from "@material-ui/core";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { DateTimePicker } from "@material-ui/pickers";
import Slider from "@material-ui/core/Slider";
import { parseISO, addHours, addDays } from "date-fns";

import { CustomModal } from "~/components/CustomModal/CustomModal";
import api from "~/services/api";

import { useStyles } from "./league-form.styles";

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

const LeagueForm = ({
  item,
  handleCloseForm,
  getList,
  setFeedback,
  openForm,
  games,
  leagueTypes,
}) => {
  const [loading, setLoading] = useState(false);

  const [values, setValues] = useState({
    league: item ? item.league : undefined,
    rules: item ? item.rules : undefined,
    description: item ? item.description : undefined,
    roundTrip: item ? item.roundTrip : undefined,
    forTeams: item ? item.forTeams : undefined,
    maxParticipants: item ? item.maxParticipants : undefined,
    leagueStart:
      item && item.leagueStart
        ? item.leagueStart
        : addHours(new Date(), 1).toISOString(),
    leagueEnd:
      item && item.leagueEnd
        ? item.leagueEnd
        : addDays(new Date(), 7).toISOString(),
    needAddress: item ? item.needAddress : false,
    leagueTypeId:
      item && item.leagueType ? item.leagueType.leagueTypeId : undefined,
    gameId: item && item.game ? item.game.gameId : undefined,
  });

  const classes = useStyles();
  const END_POINT = "/league";
  const ID = "leagueId";

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: Number.isInteger(e.target.value)
        ? +e.target.value
        : e.target.value,
    });
  };

  const handleChangeSelect = (e) => {
    setValues({
      ...values,
      [e.target.name]: +e.target.value,
    });
  };

  const handleChecked = (e) => {
    setValues({ ...values, [e.target.name]: e.target.checked });
  };

  const handleCheckedTeam = (e) => {
    if (e.target.name === "forTeams" && e.target.checked) {
      setValues({ ...values, [e.target.name]: e.target.checked });
    }

    if (e.target.name === "forTeams" && !e.target.checked) {
      setValues({
        ...values,
        [e.target.name]: e.target.checked,
      });
    }
  };

  const handleDate = (key, date) => {
    setValues({ ...values, [key]: date.toISOString() });
  };

  const handleStartDateChange = (date) => handleDate("leagueStart", date);
  const handleEndDateChange = (date) => handleDate("leagueEnd", date);

  const handleSaveItem = () => {
    save(item, values);
  };

  const handleChangeSlider = (event, newValue) => {
    setValues({
      ...values,
      maxParticipants: Number(newValue),
    });
  };

  const save = async (edit, itemData) => {
    try {
      setLoading(true);
      if (edit[ID]) {
        const { data } = await api.put(`${END_POINT}/${item[ID]}`, itemData);
        setFeedback("success", data.message);
      }

      if (!edit[ID]) {
        const { data } = await api.post(`${END_POINT}`, itemData);
        setFeedback("success", data.message);
      }
      setLoading(false);
      handleCloseForm();
      getList();
    } catch (err) {
      if (err.response && err.response.status < 500) {
        handleCloseForm();
        return setFeedback("error", err.response.data.message);
      }
      setLoading(false);
      handleCloseForm();
      return setFeedback("error", "Ops! Algo de errado aconteceu");
    }
  };

  return (
    <CustomModal
      openForm={openForm}
      handleCloseForm={handleCloseForm}
      description={"As informções dos usuarios devem ser mantidas em sigilo"}
      handleCancelForm={handleCloseForm}
      handleSaveItem={handleSaveItem}
      handleChange={handleChange}
      values={values}
      loading={loading}
      item={item}
    >
      <TextField
        className={classes.margin}
        fullWidth
        label="Liga"
        helperText="Nome da liga"
        size="medium"
        margin="dense"
        name="league"
        onChange={handleChange}
        required
        value={values.league}
        variant="outlined"
      />
      <TextField
        className={classes.margin}
        fullWidth
        label="Descrição"
        helperText="Fale um pouco sobre a liga/campeonato"
        margin="dense"
        name="description"
        onChange={handleChange}
        required
        value={values.description}
        multiline
        rows={4}
        rowsMax={4}
        variant="outlined"
      />
      <TextField
        className={classes.margin}
        fullWidth
        label="Regras"
        margin="dense"
        name="rules"
        onChange={handleChange}
        required
        value={values.rules}
        variant="outlined"
        multiline
        rows={4}
        rowsMax={4}
      />

      <FormControl component="fieldset" className={classes.control}>
        <FormLabel component="legend">Configurações</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={values.needAddress}
                onChange={handleChecked}
                name="needAddress"
                color="primary"
              />
            }
            label="Solicitar endereço dos player na inscrição"
          />
          <FormControlLabel
            control={
              <Switch
                checked={values.roundTrip}
                onChange={handleChecked}
                name="roundTrip"
                color="primary"
              />
            }
            label="Ativar jogo de ida e volta"
          />
          <FormControlLabel
            control={
              <Switch
                checked={values.forTeams}
                onChange={handleCheckedTeam}
                name="forTeams"
                color="primary"
                disabled={!!item.leagueId}
              />
            }
            label="Somente para times"
          />
        </FormGroup>
      </FormControl>

      <FormControl component="fieldset" className={classes.control}>
        <Typography gutterBottom component="label">
          N. máximo de Participantes
        </Typography>

        <MySlider
          aria-labelledby="participants-slider"
          step={1}
          marks
          name="maxParticipants"
          valueLabelDisplay={item.leagueId ? "on" : "auto"}
          onChange={handleChangeSlider}
          value={values.maxParticipants}
          min={1}
          max={1000}
          id="maxParticipants"
        />
      </FormControl>

      <FormControl component="fieldset" className={classes.dates}>
        <DateTimePicker
          label="Inicio da Liga/Campeonato"
          inputVariant="outlined"
          value={parseISO(values.leagueStart)}
          onChange={handleStartDateChange}
          name="leagueStart"
        />
        <DateTimePicker
          label="Fim da Liga/Campeonato"
          helperText="Deixe vazio para fim indeterminado"
          inputVariant="outlined"
          value={values.leagueEnd ? parseISO(values.leagueEnd) : null}
          onChange={handleEndDateChange}
          name="leagueEnd"
        />
      </FormControl>
      <FormControl variant="outlined" className={classes.control}>
        <InputLabel htmlFor="gameId">Game</InputLabel>
        <Select
          native
          id="gameId"
          value={values.gameId}
          onChange={handleChangeSelect}
          label="Game"
          fullWidth
          name="gameId"
          disabled={item && item.game && item.game.gameId}
        >
          <option aria-label="None" value="" />
          {games.map((game) => (
            <option key={`game-${game.gameId}`} value={game.gameId}>
              {game.game}
            </option>
          ))}
        </Select>
        <FormHelperText>Game do campeonato</FormHelperText>
      </FormControl>

      <FormControl variant="outlined" className={classes.control}>
        <InputLabel htmlFor="outlined-age-native-simple">Tipo</InputLabel>
        <Select
          native
          value={values.leagueTypeId}
          onChange={handleChangeSelect}
          label="Tipo"
          name="leagueTypeId"
          fullWidth
          disabled={item && item.leagueType && item.leagueType.leagueTypeId}
        >
          <option aria-label="None" value="" />
          {leagueTypes.map((type) => (
            <option key={`type-${type.leagueTypeId}`} value={type.leagueTypeId}>
              {type.type}
            </option>
          ))}
        </Select>
        <FormHelperText>
          Tipo da liga/campeonato (Exe: mata-mata, copa...)
        </FormHelperText>
      </FormControl>
    </CustomModal>
  );
};

export default LeagueForm;
