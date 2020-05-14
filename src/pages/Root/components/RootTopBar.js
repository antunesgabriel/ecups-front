import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";

import { AppBar, Toolbar, Badge, IconButton } from "@material-ui/core";
import NotificationsIcon from "@material-ui/icons/NotificationsOutlined";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import { useStyles } from "./rootTopBar.styles";
import { connect } from "react-redux";
import history from "~/utils/history";

const RootTopBar = ({ signed }) => {
  const classes = useStyles();

  const [notifications] = useState([]);

  return (
    <AppBar className={clsx(classes.root)}>
      <Toolbar>
        <RouterLink to="/">
          <img alt="Logo" src="/img/logoLargue.png" className={classes.logo} />
        </RouterLink>
        <div className={classes.flexGrow} />
        {signed && (
          <>
            <IconButton className={classes.icon}>
              <Badge
                badgeContent={notifications.length}
                color="primary"
                variant="dot"
              >
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              className={classes.signOutButton}
              onClick={() => history.push("/logout")}
            >
              <ExitToAppIcon />
            </IconButton>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user,
  signed: state.auth.signed,
});

export default connect(mapStateToProps)(RootTopBar);
