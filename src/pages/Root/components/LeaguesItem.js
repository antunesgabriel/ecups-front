import React from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import { APIURL } from "~/services/api";
import { Link } from "react-router-dom";

export const LeaguesItem = ({ leagues, classes }) => {
  return (
    <>
      {leagues.map((league) => (
        <Grid item xs={6} md={4} sm={6} className={classes.imgContainer}>
          <img
            className={classes.img}
            src={`${APIURL}/files/${league.thumb || league.game.logo}`}
            alt=""
          />
          <article className={classes.imgTitleContainer}>
            <Typography variant="h6" classesName={classes.imgTitle}>
              {league.league}
            </Typography>
            <Typography variant="caption" className={classes.caption}>
              Por: @{league.user.nickname}
            </Typography>
            <Typography variant="body2" className={classes.caption}>
              Inscrições abertas para disputa entre{" "}
              <b>{league.forTeams ? "times" : "players"}</b>
            </Typography>
            <Button
              variant="contained"
              className={classes.btn}
              component={Link}
              to={`/player/subscription/league/${league.leagueId}`}
            >
              Participar
            </Button>
          </article>
        </Grid>
      ))}
    </>
  );
};
