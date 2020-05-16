import React from "react";
import { Skeleton } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    marginRight: theme.spacing(2),
  },

  nickname: {
    width: "100%",
    maxWidth: 100,
    marginRight: theme.spacing(2),
  },

  email: {
    width: "100%",
    maxWidth: 200,
  },

  row: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

export function MembersSkeleton() {
  const classes = useStyles();

  return (
    <>
      <div className={classes.row}>
        <div>
          <Skeleton variant="circle" className={classes.avatar} />
        </div>
        <div className={classes.nickname}>
          <Skeleton variant="text" className={classes.nickname} />
        </div>
        <div className={classes.email}>
          <Skeleton variant="text" className={classes.email} />
        </div>
      </div>
      <div className={classes.row}>
        <div>
          <Skeleton variant="circle" className={classes.avatar} />
        </div>
        <div className={classes.nickname}>
          <Skeleton variant="text" className={classes.nickname} />
        </div>
        <div className={classes.email}>
          <Skeleton variant="text" className={classes.email} />
        </div>
      </div>
      <div className={classes.row}>
        <div>
          <Skeleton variant="circle" className={classes.avatar} />
        </div>
        <div className={classes.nickname}>
          <Skeleton variant="text" className={classes.nickname} />
        </div>
        <div className={classes.email}>
          <Skeleton variant="text" className={classes.email} />
        </div>
      </div>
      <div className={classes.row}>
        <div>
          <Skeleton variant="circle" className={classes.avatar} />
        </div>
        <div className={classes.nickname}>
          <Skeleton variant="text" className={classes.nickname} />
        </div>
        <div className={classes.email}>
          <Skeleton variant="text" className={classes.email} />
        </div>
      </div>
    </>
  );
}
