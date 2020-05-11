import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";

import { AppBar, Toolbar, Badge, Hidden, IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/NotificationsOutlined";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import { useStyles } from "./topBar.styles";
import { connect } from "react-redux";
import history from "~/utils/history";

const TopBar = ({ onSidebarOpen }) => {
  const classes = useStyles();

  const [notifications] = useState([]);

  return (
    <AppBar className={clsx(classes.root)}>
      <Toolbar>
        <RouterLink to="/">
          <img alt="Logo" src="/img/logoLargue.png" className={classes.logo} />
        </RouterLink>
        <div className={classes.flexGrow} />
        <Hidden mdDown>
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
        </Hidden>
        <Hidden lgUp>
          <IconButton className={classes.icon} onClick={onSidebarOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user,
});

export default connect(mapStateToProps)(TopBar);
