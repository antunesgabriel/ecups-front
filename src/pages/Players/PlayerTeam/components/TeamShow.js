import React, { useState, useEffect } from "react";
import clsx from "clsx";
import {
  Grid,
  Divider,
  CardContent,
  Typography,
  Card,
  Avatar,
  CardActions,
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  InputAdornment,
  CircularProgress,
} from "@material-ui/core";
import { bindActionCreators } from "redux";
import DeleteIcon from "@material-ui/icons/Delete";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import { connect } from "react-redux";

import FeedbackActions from "~/redux/ducks/feedbackDuck";
import api, { APIURL } from "~/services/api";

import { useStyles } from "./team-show.styles";
import { MembersSkeleton } from "./MembersSkeleton";

function getPreview(src) {
  if (!src) {
    return null;
  }
  if (typeof src === "string") {
    return `${APIURL}/files/${src}`;
  }

  return URL.createObjectURL(src);
}

function TeamShow({ team, className, setFeedback }) {
  const [nickname, setNickname] = useState("");
  const [members, setMembers] = useState([]);
  const [boss, setBoss] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingMembers, setLoadingMembers] = useState(true);
  const [open, setOpen] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    (async function () {
      const { members, boss } = await getMembers();
      setBoss(boss);
      setMembers(members);
      setLoadingMembers(false);
    })();
  });

  const getMembers = async () => {
    try {
      const { data } = await api.get("/team/show");
      if (!data.team) {
        return { members: [], boos: null };
      }
      return data.team;
    } catch (err) {
      if (err.response && err.response.statusCode < 500) {
        setFeedback("error", err.response.message);
        return { members: [], boos: null };
      }
      setFeedback("error", "Falha ao obter dados");
      return { members: [], boos: null };
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleChange = (e) => {
    setNickname(e.target.value);
  };

  const handleClose = () => {
    setOpen(false);
    setNickname("");
  };

  const handleAdd = async () => {
    try {
      setLoading(true);
      const { data } = await api.post(`/invitation/${team.teamId}`, {
        nickname,
      });
      setFeedback("success", data.message);
    } catch (err) {
      if (err.response && err.response.statusCode < 500) {
        setFeedback("error", err.response.message);
        return;
      }
      setFeedback("error", "Falha ao obter dados");
      return;
    } finally {
      setOpen(false);
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Adcionar membro</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Digite o nickname do player que deseja adcionar (Ele deve possuir
            cadastro na plataforma)
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            variant="outlined"
            id="nickname"
            label="Nickname"
            value={nickname}
            onChange={handleChange}
            type="text"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AlternateEmailIcon size={14} color="primary" />
                </InputAdornment>
              ),
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="text">
            Cancelar
          </Button>
          <Button
            onClick={handleAdd}
            color="primary"
            disabled={loading || !nickname}
          >
            {loading ? (
              <CircularProgress size={18} color="inherit" />
            ) : (
              "Convidar"
            )}
          </Button>
        </DialogActions>
      </Dialog>
      <Grid container>
        <Grid item md={12} xs={12}>
          <Card className={clsx(classes.root, className)}>
            <CardContent>
              <div className={classes.details}>
                <div>
                  <Typography gutterBottom variant="h3">
                    {team.team}
                  </Typography>
                  <Typography
                    className={classes.locationText}
                    color="textSecondary"
                    variant="body1"
                  >
                    {team.bio}
                  </Typography>
                  {boss && (
                    <Typography
                      className={classes.locationText}
                      color="textSecondary"
                      variant="body1"
                    >
                      Lider: @{boss.nickname}
                    </Typography>
                  )}
                </div>
                <Avatar
                  className={classes.shield}
                  src={getPreview(team.shield)}
                  alt={team.team}
                />
              </div>
              <Divider className={classes.divider} />
              <Typography
                className={classes.locationText}
                color="textSecondary"
                variant="h5"
              >
                Membros:
              </Typography>
              {loadingMembers ? (
                <MembersSkeleton />
              ) : (
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell />
                      <TableCell>Nickname</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Remover</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {members.map((member) => (
                      <TableRow key={member.nickname}>
                        <TableCell align="center">
                          <Avatar
                            src={`${APIURL}/files/${member.avatar}`}
                            alt={member.nickname}
                            // className={classes.small}
                          />
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {member.nickname}
                        </TableCell>
                        <TableCell>{member.email}</TableCell>
                        <TableCell>
                          <IconButton
                            disabled={boss.nickname === member.nickname}
                          >
                            <DeleteIcon color="inherit" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
            <Divider />
            <CardActions>
              <Button
                variant="contained"
                className={classes.info}
                onClick={handleClickOpen}
              >
                Adcionar membro
              </Button>
              <Button
                onClick={() => {}}
                className={classes.danger}
                variant="contained"
              >
                Sair do time
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

const mapActionsToProps = (dispatch) =>
  bindActionCreators(FeedbackActions, dispatch);

const mapStateToProps = (state) => ({
  team: state.user.user.team,
});

export default connect(mapStateToProps, mapActionsToProps)(TeamShow);
