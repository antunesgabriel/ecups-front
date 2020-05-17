/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import UserActions from "~/redux/ducks/userDuck";
import { bindActionCreators } from "redux";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import Layout from "~/layout/Layout";
import {
  Grid,
  Container,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  IconButton,
  Typography,
  Paper,
  TableHead,
} from "@material-ui/core";

import { useStyles } from "./playerInvitation.styles";
import api from "~/services/api";
import FeedbackActions from "~/redux/ducks/feedbackDuck";
import { format, parseISO } from "date-fns";
import { Skeleton } from "@material-ui/lab";

function PlayerInvitationPage({ setUserTeam, setFeedback }) {
  const [invitations, setInvitations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function () {
      await getInvitations();
    })();
  }, []);

  const getInvitations = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/invitation");
      setInvitations(data.invitations);
      setLoading(false);
    } catch (err) {
      if (err.response && err.response.status < 500) {
        setFeedback("error", err.response.data.message);
        setLoading(false);
        return;
      }
      setFeedback("error", "Falha ao obter dados");
      setLoading(false);
      return;
    }
  };

  const handleAccept = async (_id, accept) => {
    try {
      setLoading(true);
      const { data } = await api.put("/invitation", {
        _id,
        accept,
      });
      setFeedback("success", data.message);
      setUserTeam(data.team);
      getInvitations();
    } catch (err) {
      if (err.response && err.response.status < 500) {
        setFeedback("error", err.response.data.message);
        return;
      }
      setFeedback("error", "Falha ao obter dados");
      return;
    } finally {
      getInvitations();
    }
  };

  const hanldeRecuse = async (_id, accept) => {
    try {
      setLoading(true);
      const { data } = await api.put("/invitation", {
        _id,
        accept,
      });
      setFeedback("success", data.message);
      getInvitations();
    } catch (err) {
      if (err.response && err.response.status < 500) {
        setFeedback("error", err.response.data.message);
        return;
      }
      setFeedback("error", "Falha ao obter dados");
      return;
    } finally {
      getInvitations();
    }
  };

  const classes = useStyles();
  return (
    <Layout>
      <Container maxWidth="md">
        <Grid container>
          <Grid item xs>
            <TableContainer component={Paper} elevation={2}>
              <Table
                className={classes.table}
                aria-labelledby="tableTitle"
                aria-label="enhanced table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Time</TableCell>
                    <TableCell>Data</TableCell>
                    <TableCell>Aceitar</TableCell>
                    <TableCell>Recusar</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <TableRow>
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
                      {invitations.map((invitation) => (
                        <TableRow hover key={invitation._id}>
                          <TableCell>
                            <Typography color="textPrimary">
                              {invitation.teamName}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            {format(
                              parseISO(invitation.createdAt),
                              "dd/MM/yyyy HH:mm:ss"
                            )}
                          </TableCell>
                          <TableCell>
                            <IconButton
                              onClick={() => handleAccept(invitation._id, true)}
                            >
                              <CheckIcon color="inherit" />
                            </IconButton>
                          </TableCell>
                          <TableCell>
                            <IconButton
                              onClick={() =>
                                hanldeRecuse(invitation._id, false)
                              }
                            >
                              <CloseIcon color="inherit" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
}

const mapActionsToProps = (dispatch) =>
  bindActionCreators({ ...UserActions, ...FeedbackActions }, dispatch);

export default connect(null, mapActionsToProps)(PlayerInvitationPage);
