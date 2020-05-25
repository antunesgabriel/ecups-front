/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { format, parseISO } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  Typography,
  TableHead,
  Paper,
  Avatar,
} from "@material-ui/core";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Skeleton } from "@material-ui/lab";

import { StatusBullet } from "~/components/StatusBullet";
import api, { APIURL } from "~/services/api";

import { useStyles } from "../subscription.styles";
import FeedbackActions from "~/redux/ducks/feedbackDuck";

function getStatus(status) {
  if (typeof status !== "boolean") {
    return {
      label: "Pendente",
      color: "info",
    };
  }

  return status
    ? {
        label: "Confirmada",
        color: "success",
      }
    : {
        label: "Recusada",
        color: "error",
      };
}

function Subscriptions({ setFeedback }) {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function () {
      const list = await handleGetSubscriptions();
      if (list) {
        setSubscriptions(list);
      }
      setLoading(false);
    })();
  }, []);

  const classes = useStyles();

  // Handlers

  const handleGetSubscriptions = async () => {
    try {
      const { data } = await api.get("/subscription?like=player");
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

  return (
    <>
      <Typography variant="h3" className={classes.margin}>
        Minhas Inscrições
      </Typography>
      <Typography variant="body2" className={classes.margin}>
        Status dos seus pedidos de inscrições em ligas criadas por outros
        usuários
      </Typography>
      <TableContainer component={Paper} elevation={2}>
        <Table
          className={classes.table}
          aria-labelledby="minhasInscrições"
          aria-label="tabela de status de incrições"
        >
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell align="center">Liga</TableCell>
              <TableCell align="center">Organizador</TableCell>
              <TableCell align="center">Disputa Entre</TableCell>
              <TableCell align="center">Inicio da Liga</TableCell>
              <TableCell align="center">Fim da Liga</TableCell>
              <TableCell align="center">Status do Pedido</TableCell>
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
                <TableCell>
                  <Skeleton variant="text" />
                </TableCell>
              </TableRow>
            ) : (
              <>
                {subscriptions.map((subscription) => (
                  <TableRow hover key={subscription._id}>
                    <TableCell>
                      <Avatar
                        src={`${APIURL}/files/${
                          subscription.league.thumb ||
                          subscription.league.game.logo
                        }`}
                      />
                    </TableCell>
                    <TableCell align="center">
                      {subscription.league.league}
                    </TableCell>
                    <TableCell align="center">
                      @{subscription.league.user.nickname}
                    </TableCell>
                    <TableCell align="center">
                      {subscription.league.forTeams ? "TIMES" : "PLAYERS"}
                    </TableCell>
                    <TableCell align="center">
                      {format(
                        parseISO(subscription.league.leagueStart),
                        "dd/MM/yyyy HH:mm:ss"
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {format(
                        parseISO(subscription.league.leagueEnd),
                        "dd/MM/yyyy HH:mm:ss"
                      )}
                    </TableCell>
                    <TableCell align="center">
                      <StatusBullet
                        size="sm"
                        color={getStatus(subscription.status).color}
                      />{" "}
                      {getStatus(subscription.status).label}
                    </TableCell>
                  </TableRow>
                ))}
              </>
            )}
          </TableBody>
        </Table>
        {!loading && !subscriptions.length && (
          <Typography
            variant="caption"
            color="textPrimary"
            className={classes.empty}
          >
            Os status dos seus pedidos de inscrições aparecerão aqui
          </Typography>
        )}
      </TableContainer>
    </>
  );
}

const mapActionsToProps = (dispatch) =>
  bindActionCreators(FeedbackActions, dispatch);

export default connect(null, mapActionsToProps)(Subscriptions);
