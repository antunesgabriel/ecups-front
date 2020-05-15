import React from "react";
import clsx from "clsx";
import {
  Grid,
  Divider,
  CardContent,
  Typography,
  Card,
  Avatar,
  CardActions,
  CardHeader,
  Button,
} from "@material-ui/core";

import { useStyles } from "./team-shield.styles";
import { APIURL } from "~/services/api";

function getPreview(src) {
  if (!src) {
    return null;
  }
  if (typeof src === "string") {
    return `${APIURL}/files/${src}`;
  }

  return URL.createObjectURL(src);
}

export function TeamShield({
  team,
  handleChangeShield,
  className,
  shield,
  handleRemove,
}) {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item md={12} xs={12}>
        <Card className={clsx(classes.root, className)}>
          <CardHeader
            subheader="Uma boa logo impõe espeito"
            title="Logo do time"
          />
          <Divider />
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
              </div>
              <Avatar
                className={classes.shield}
                src={getPreview(shield.shield)}
                alt={team.team}
              />
            </div>
          </CardContent>
          <Divider />
          <CardActions>
            {!team.shield && (
              <Button
                className={classes.uploadButton}
                color="primary"
                variant="text"
                component="label"
              >
                Escolher logo do time
                <input
                  className={classes.file}
                  color="primary"
                  type="file"
                  name="shield"
                  onChange={handleChangeShield}
                  accept="image/png,image/gif,image/jpeg"
                />
              </Button>
            )}

            {team.shield && (
              <Button variant="text" onClick={handleRemove}>
                Remove foto
              </Button>
            )}
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
}
