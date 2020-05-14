import React from "react";
import { Grid } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

export function LeaguesSkeleton() {
  return (
    <>
      <Grid
        item
        xs={12}
        md={4}
        sm={6}
        key={`t-${Math.round(Math.random() * 1000 + 1)}`}
      >
        <Skeleton variant="rect" height={250} width="100%" />
      </Grid>

      <Grid
        item
        xs={12}
        md={4}
        sm={6}
        key={`t-${Math.round(Math.random() * 1000 + 1)}`}
      >
        <Skeleton variant="rect" height={250} width="100%" />
      </Grid>
      <Grid
        item
        xs={12}
        md={4}
        sm={6}
        key={`t-${Math.round(Math.random() * 1000 + 1)}`}
      >
        <Skeleton variant="rect" height={250} width="100%" />
      </Grid>
      <Grid
        item
        xs={12}
        md={4}
        sm={6}
        key={`t-${Math.round(Math.random() * 1000 + 1)}`}
      >
        <Skeleton variant="rect" height={250} width="100%" />
      </Grid>
      <Grid
        item
        xs={12}
        md={4}
        sm={6}
        key={`t-${Math.round(Math.random() * 1000 + 1)}`}
      >
        <Skeleton variant="rect" height={250} width="100%" />
      </Grid>
      <Grid
        item
        xs={12}
        md={4}
        sm={6}
        key={`t-${Math.round(Math.random() * 1000 + 1)}`}
      >
        <Skeleton variant="rect" height={250} width="100%" />
      </Grid>
      <Grid
        item
        xs={12}
        md={4}
        sm={6}
        key={`t-${Math.round(Math.random() * 1000 + 1)}`}
      >
        <Skeleton variant="rect" height={250} width="100%" />
      </Grid>
      <Grid
        item
        xs={12}
        md={4}
        sm={6}
        key={`t-${Math.round(Math.random() * 1000 + 1)}`}
      >
        <Skeleton variant="rect" height={250} width="100%" />
      </Grid>
      <Grid
        item
        xs={12}
        md={4}
        sm={6}
        key={`t-${Math.round(Math.random() * 1000 + 1)}`}
      >
        <Skeleton variant="rect" height={250} width="100%" />
      </Grid>
    </>
  );
}
