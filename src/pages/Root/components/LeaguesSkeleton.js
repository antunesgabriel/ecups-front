import React from "react";
import { Grid } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

export function LeaguesSkeleton() {
  return (
    <>
      <Grid
        item
        xs={12}
        sm={12}
        md={6}
        lg={4}
        xl={4}
        key={`t-${Math.round(Math.random() * 1000 + 1)}`}
      >
        <Skeleton variant="rect" height={250} width="100%" />
      </Grid>

      <Grid
        item
        xs={12}
        sm={12}
        md={6}
        lg={4}
        xl={4}
        key={`t-${Math.round(Math.random() * 1000 + 1)}`}
      >
        <Skeleton variant="rect" height={250} width="100%" />
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={6}
        lg={4}
        xl={4}
        key={`t-${Math.round(Math.random() * 1000 + 1)}`}
      >
        <Skeleton variant="rect" height={250} width="100%" />
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={6}
        lg={4}
        xl={4}
        key={`t-${Math.round(Math.random() * 1000 + 1)}`}
      >
        <Skeleton variant="rect" height={250} width="100%" />
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={6}
        lg={4}
        xl={4}
        key={`t-${Math.round(Math.random() * 1000 + 1)}`}
      >
        <Skeleton variant="rect" height={250} width="100%" />
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={6}
        lg={4}
        xl={4}
        key={`t-${Math.round(Math.random() * 1000 + 1)}`}
      >
        <Skeleton variant="rect" height={250} width="100%" />
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={6}
        lg={4}
        xl={4}
        key={`t-${Math.round(Math.random() * 1000 + 1)}`}
      >
        <Skeleton variant="rect" height={250} width="100%" />
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={6}
        lg={4}
        xl={4}
        key={`t-${Math.round(Math.random() * 1000 + 1)}`}
      >
        <Skeleton variant="rect" height={250} width="100%" />
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={6}
        lg={4}
        xl={4}
        key={`t-${Math.round(Math.random() * 1000 + 1)}`}
      >
        <Skeleton variant="rect" height={250} width="100%" />
      </Grid>
    </>
  );
}
