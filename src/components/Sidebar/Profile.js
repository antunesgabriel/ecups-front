import React from "react";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { Avatar, Typography } from "@material-ui/core";
import { connect } from "react-redux";

const APIURL = process.env.REACT_APP_API_URL;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "fit-content",
  },
  avatar: {
    width: 60,
    height: 60,
  },
  name: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(0.5),
  },
}));

const Profile = ({ user, className, ...rest }) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)}>
      <Avatar
        alt={`${user.name} ${user.surname}`}
        className={classes.avatar}
        component={RouterLink}
        src={user.avatar ? `${APIURL}/files/${user.avatar}` : ""}
        to="/admin/account"
      />
      <Typography className={classes.name} variant="h4">
        @{user.nickname}
      </Typography>
      <Typography variant="body2">
        {user.name} {user.surname}
      </Typography>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user,
});

export default connect(mapStateToProps)(Profile);
