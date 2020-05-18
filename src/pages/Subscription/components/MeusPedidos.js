import React from "react";
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
} from "@material-ui/core";

import { StatusBullet } from "~/components/StatusBullet";

function getStatus(status) {
  if (typeof status !== "boolean") {
    return {
      label: "Pendente",
      color: "neutral",
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

function MeusPedidos({ classes, meusPedidos }) {
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
            {meusPedidos.map((pedido) => (
              <TableRow hover key={pedido._id}>
                <TableCell align="center">{pedido.league}</TableCell>
                <TableCell align="center">
                  @{pedido.league.user.nickname}
                </TableCell>
                <TableCell align="center">
                  {pedido.league.forTeams ? "TIMES" : "PLAYERS"}
                </TableCell>
                <TableCell align="center">
                  {format(
                    parseISO(pedido.league.leagueStart),
                    "dd/MM/yyyy HH:mm:ss"
                  )}
                </TableCell>
                <TableCell align="center">
                  {format(
                    parseISO(pedido.league.leagueEnd),
                    "dd/MM/yyyy HH:mm:ss"
                  )}
                </TableCell>
                <TableCell align="center">
                  <StatusBullet
                    size="sm"
                    color={getStatus(pedido.status).color}
                  />{" "}
                  {getStatus(pedido.status).label}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {!meusPedidos.length && (
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

export default MeusPedidos;
