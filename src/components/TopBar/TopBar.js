import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";

import { AppBar, Toolbar, Badge, Hidden, IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/NotificationsOutlined";
import Avatar from "@material-ui/core/Avatar";
import InputIcon from "@material-ui/icons/Input";

import { useStyles } from "./topBar.styles";
import { connect } from "react-redux";

const APIURL = process.env.REACT_APP_API_URL;

const TopBar = ({ onSidebarOpen, user }) => {
  const classes = useStyles();
  console.log(user);
  const [notifications] = useState([]);

  return (
    <AppBar className={clsx(classes.root)}>
      <Toolbar>
        <RouterLink to="/">
          <img alt="Logo" src="/img/logoLargue.png" className={classes.logo} />
        </RouterLink>
        <div className={classes.flexGrow} />
        <Hidden mdDown>
          <IconButton color="inherit">
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
          {/* <IconButton className={classes.signOutButton} color="inherit">
            <InputIcon />
          </IconButton> */}
          <IconButton>
            <Avatar
              alt={`${user.name} ${user.surname}`}
              src={user.avatar ? `${APIURL}/files/${user.avatar}` : ""}
              className={classes.small}
            />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onSidebarOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(TopBar);
