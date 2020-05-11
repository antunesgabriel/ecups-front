import React from "react";
import clsx from "clsx";

import { Card, CardContent, Grid, Typography, Avatar } from "@material-ui/core";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

import { useStyles } from "./board.styles";

const Board = ({
  className,
  icon: Icon,
  describe,
  up,
  title,
  value,
  porcentage,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent>
        <Grid container justify="space-between">
          <Grid item>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              variant="body2"
            >
              {title}
            </Typography>
            <Typography variant="h3">{value}</Typography>
          </Grid>
          <Grid item>
            <Avatar
              className={
                porcentage
                  ? up
                    ? classes.avatar
                    : classes.avatarDown
                  : classes.avatarInfo
              }
            >
              <Icon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
        <div className={classes.difference}>
          {!!porcentage && (
            <>
              {up ? (
                <ArrowUpwardIcon className={classes.differenceIcon} />
              ) : (
                <ArrowDownwardIcon className={classes.down} />
              )}
              <Typography
                className={
                  up ? classes.differenceValue : classes.differenceValueDown
                }
                variant="body2"
              >
                {porcentage}%
              </Typography>
            </>
          )}
          <Typography className={classes.caption} variant="caption">
            {describe}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default Board;
