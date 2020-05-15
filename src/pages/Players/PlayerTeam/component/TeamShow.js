import React, { useState } from "react";
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
  makeStyles,
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
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";

import api, { APIURL } from "~/services/api";

function getPreview(src) {
  if (!src) {
    return null;
  }
  if (typeof src === "string") {
    return `${APIURL}/files/${src}`;
  }

  return URL.createObjectURL(src);
}

export const useStyles = makeStyles((theme) => ({
  root: {},
  details: {
    display: "flex",
  },
  shield: {
    marginLeft: "auto",
    height: 110,
    width: 100,
    flexShrink: 0,
    flexGrow: 0,
  },
  uploadButton: {
    marginRight: theme.spacing(2),
  },
  file: {
    display: "none",
  },
  danger: {
    backgroundColor: theme.palette.error.main,
    "&:hover": {
      backgroundColor: theme.palette.error.dark,
    },
    color: theme.palette.primary.light,
  },
  info: {
    backgroundColor: theme.palette.info.main,
    "&:hover": {
      backgroundColor: theme.palette.info.dark,
    },
    color: theme.palette.primary.light,
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },

  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

export function TeamShow({ team, className, setFeedback }) {
  const [nickname, setNickname] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleChange = (e) => {
    setNickname(e.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = async () => {
    try {
      setLoading(true);
      const { data } = await api.post("/team-player", { nickname });
    } catch (err) {
      setLoading(false);
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
          <Button onClick={handleClose} color="primary">
            Convidar
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
                  <Typography
                    className={classes.locationText}
                    color="textSecondary"
                    variant="body1"
                  >
                    Lider: @{team.boss.nickname}
                  </Typography>
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
                  {team.members.map((member) => (
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
                          disabled={team.boss.nickname === member.nickname}
                        >
                          <DeleteIcon color="inherit" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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
