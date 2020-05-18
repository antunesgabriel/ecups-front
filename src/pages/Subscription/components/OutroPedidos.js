import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  Typography,
  TableHead,
  Paper,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import { format, parseISO } from "date-fns";

import { useStyles } from "../subiscription.styles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import FeedbackActions from "~/redux/ducks/feedbackDuck";

function OutrosPedidos({ setFeedback }) {
  const [outrosPedidos, setOutrosPedidos] = useState([]);

  const classes = useStyles();
  return (
    <>
      <Typography variant="h3" className={classes.margin}>
        Pedidos de Inscrições
      </Typography>
      <Typography variant="body2" className={classes.margin}>
        Pedido de inscrições em ligas criadas por você, aceite ou recuse a
        inscrição.
      </Typography>
      <TableContainer component={Paper} elevation={2} className={classes.paper}>
        <Table
          className={classes.table}
          aria-labelledby="minhasInscrições"
          aria-label="tabela de pedidos de inscrições"
        >
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell align="center">Nome</TableCell>
              <TableCell align="center">Nome da Liga</TableCell>
              <TableCell align="center">Disputa Entre</TableCell>
              <TableCell align="center">Inicio da Liga</TableCell>
              <TableCell align="center">Fim da Liga</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {outrosPedidos.map((other) => (
              <TableRow hover key={other._id}>
                <TableCell align="center">
                  <Tooltip title="aceitar pedido de inscrição">
                    <IconButton>
                      <CheckIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="recusar pedido de inscrição">
                    <IconButton>
                      <CloseIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell align="center">
                  {other.league.forTeams
                    ? other.team.team
                    : other.player.nickname}
                </TableCell>
                <TableCell align="center">{other.league.league}</TableCell>
                <TableCell align="center">
                  {other.league.forTeams ? "TIMES" : "PLAYERS"}
                </TableCell>

                <TableCell align="center">
                  {format(
                    parseISO(other.league.leagueStart),
                    "dd/MM/yyyy HH:mm:ss"
                  )}
                </TableCell>
                <TableCell align="center">
                  {format(
                    parseISO(other.league.leagueEnd),
                    "dd/MM/yyyy HH:mm:ss"
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {!outrosPedidos.length && (
          <Typography
            variant="caption"
            color="textPrimary"
            className={classes.empty}
          >
            Os pedidos de inscrições em ligas criadas por você aparecerão aqui
          </Typography>
        )}
      </TableContainer>
    </>
  );
}

const mapActionsToProps = (dispatch) =>
  bindActionCreators(FeedbackActions, dispatch);

export default connect(null, mapActionsToProps)(OutrosPedidos);
