import React from "react";
import MUIRichTextEditor from "mui-rte";
import {
  Grid,
  TextField,
  Slider,
  Select,
  Typography,
  FormHelperText,
  FormControl,
  FormGroup,
  FormControlLabel,
  FormLabel,
  InputLabel,
  Switch,
  withStyles,
} from "@material-ui/core";
import { DateTimePicker } from "@material-ui/pickers";
import { parseISO } from "date-fns";

import { textToHtml } from "~/helpers/html";

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

export const LeagueForm = ({
  classes,
  values,
  handleChangeText,
  handleSaveRTE,
  handleChangeChecked,
  edited,
  handleChangeSlider,
  handleStartDateChange,
  handleEndDateChange,
  handleChangeSelect,
  games,
  leagueTypes,
}) => (
  <>
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
        onSave={(data) => handleSaveRTE("description", data)}
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
        Digite a descrição do campeonato <b>E CLIQUE NO ICONE SALVAR</b>
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
        Digite as regras do campeonato <b>E CLIQUE NO ICONE SALVAR</b>
      </FormHelperText>
    </Grid>

    <Grid item md={12} xs={12} lg={12} xl={12}>
      <FormControl component="fieldset">
        <FormLabel component="legend">Configurações</FormLabel>
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
      <FormControl component="fieldset" className={classes.control}>
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
      <FormControl component="fieldset" className={classes.control}>
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
      <FormControl component="fieldset" className={classes.control}>
        <DateTimePicker
          label="Fim da Liga"
          helperText="Deixe vazio para fim indeterminado"
          inputvariant="standard"
          value={values.leagueEnd ? parseISO(values.leagueEnd) : null}
          onChange={handleEndDateChange}
          name="leagueEnd"
        />
      </FormControl>
    </Grid>

    <Grid item md={6} xs={12} lg={6} xl={6}>
      <FormControl variant="standard" className={classes.control}>
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
            <option key={`game-${game.gameId}`} value={game.gameId}>
              {game.game}
            </option>
          ))}
        </Select>
        <FormHelperText>Game do campeonato</FormHelperText>
      </FormControl>
    </Grid>

    <Grid item md={6} xs={12} lg={6} xl={6} className={classes.control}>
      <FormControl variant="standard">
        <InputLabel htmlFor="outlined-age-native-simple">Tipo</InputLabel>
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
            <option key={`type-${type.leagueTypeId}`} value={type.leagueTypeId}>
              {type.type}
            </option>
          ))}
        </Select>
        <FormHelperText>
          Tipo da liga/campeonato (Exe: mata-mata, copa...)
        </FormHelperText>
      </FormControl>
    </Grid>
  </>
);
