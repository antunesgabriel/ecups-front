/* eslint-disable react-hooks/exhaustive-deps */
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
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import { format, parseISO } from "date-fns";
import { Skeleton } from "@material-ui/lab";

import { useStyles } from "../subscription.styles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import FeedbackActions from "~/redux/ducks/feedbackDuck";
import api from "~/services/api";

function Requests({ setFeedback }) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    (async function () {
      const list = await handleGetRequests();
      if (list) {
        setRequests(list);
      }
      setLoading(false);
    })();
  }, []);

  const classes = useStyles();

  const handleGetRequests = async () => {
    try {
      const { data } = await api.get("/subscription?like=organizer");
      return data.list;
    } catch (err) {
      if (err.response && err.response.status < 500) {
        setFeedback("error", err.response.data.message);
        return null;
      }
      setFeedback("error", "Ops! Algo de errado aconteceu");
      return null;
    }
  };

  const handleResponse = async (leagueId, accept, _id) => {
    try {
      setOpen(true);
      const { data } = await api.put("/subscription", {
        _id,
        leagueId,
        accept,
      });
      setFeedback("success", data.message);
      setRequests(data.requests);
    } catch (err) {
      if (err.response && err.response.status < 500) {
        setFeedback("error", err.response.data.message);
        return null;
      }
      setFeedback("error", "Ops! Algo de errado aconteceu");
      return null;
    } finally {
      setOpen(false);
    }
  };

  return (
    <>
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
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
              <TableCell align="left" />
              <TableCell align="center">Time/Player</TableCell>
              <TableCell align="center">Nome da Liga</TableCell>
              <TableCell align="center">Disputa Entre</TableCell>
              <TableCell align="center">Inicio da Liga</TableCell>
              <TableCell align="center">Fim da Liga</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell>
                  <Skeleton variant="circle" width={40} height={40} />
                </TableCell>
                <TableCell>
                  <Skeleton variant="text" />
                </TableCell>
                <TableCell>
                  <Skeleton variant="text" />
                </TableCell>
                <TableCell>
                  <Skeleton variant="text" />
                </TableCell>
                <TableCell>
                  <Skeleton variant="text" />
                </TableCell>
                <TableCell>
                  <Skeleton variant="text" />
                </TableCell>
              </TableRow>
            ) : (
              <>
                {requests.map((request) => (
                  <TableRow hover key={request._id}>
                    <TableCell align="left">
                      <Tooltip title="aceitar pedido de inscrição">
                        <IconButton
                          onClick={() =>
                            handleResponse(
                              request.league.leagueId,
                              true,
                              request._id
                            )
                          }
                        >
                          <CheckIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="recusar pedido de inscrição">
                        <IconButton
                          onClick={() =>
                            handleResponse(
                              request.league.leagueId,
                              false,
                              request._id
                            )
                          }
                        >
                          <CloseIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                    <TableCell align="center">
                      {request.league.forTeams
                        ? request.team.team
                        : `@${request.player.nickname}`}
                    </TableCell>
                    <TableCell align="center">
                      {request.league.league}
                    </TableCell>
                    <TableCell align="center">
                      {request.league.forTeams ? "TIMES" : "PLAYERS"}
                    </TableCell>

                    <TableCell align="center">
                      {format(
                        parseISO(request.league.leagueStart),
                        "dd/MM/yyyy HH:mm:ss"
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {format(
                        parseISO(request.league.leagueEnd),
                        "dd/MM/yyyy HH:mm:ss"
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </>
            )}
          </TableBody>
        </Table>
        {!loading && !requests.length && (
          <Typography
            variant="caption"
            color="textPrimary"
            className={classes.empty}
          >
            Nenhum pedido de inscrição no momento
          </Typography>
        )}
      </TableContainer>
    </>
  );
}

const mapActionsToProps = (dispatch) =>
  bindActionCreators(FeedbackActions, dispatch);

export default connect(null, mapActionsToProps)(Requests);
