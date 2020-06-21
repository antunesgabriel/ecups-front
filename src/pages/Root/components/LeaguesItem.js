import React from "react";
import { Grid, Typography, Button, Fade } from "@material-ui/core";
import { APIURL } from "~/services/api";
import { Link } from "react-router-dom";

export const LeaguesItem = ({ leagues, classes }) => {
  return (
    <>
      {leagues.map((league) => (
        <Fade
          key={league.leagueId}
          in={!!leagues.length}
          {...(leagues.length ? { timeout: 1000 } : {})}
        >
          <Grid item xs={12} md={4} sm={6} className={classes.imgContainer}>
            <img
              className={classes.img}
              src={`${APIURL}/files/${league.thumb || league.game.logo}`}
              alt=""
            />
            <article className={classes.imgTitleContainer}>
              <Typography variant="h6" className={classes.imgTitle}>
                {league.league}
              </Typography>
              <Typography variant="caption" className={classes.caption}>
                Por: @{league.user.nickname}
              </Typography>
              <Typography variant="body2">
                <b>Game:</b> {league.game.game}
              </Typography>
              <Typography variant="body2" className={classes.caption}>
                Inscrições abertas para disputa entre{" "}
                <b>{league.forTeams ? "times" : "players"}</b>
              </Typography>
              <Button
                variant="contained"
                className={classes.btn}
                component={Link}
                to={`/league/info?leagueId=${league.leagueId}`}
              >
                {league.forTeams ? "Inscrever meu time" : "Inscrever-se"}
              </Button>
            </article>
          </Grid>
        </Fade>
      ))}
      {!leagues.length && (
        <div className={classes.center}>
          <Typography variant="caption" align="center">
            Nenhuma liga disponível
          </Typography>
        </div>
      )}
    </>
  );
};
