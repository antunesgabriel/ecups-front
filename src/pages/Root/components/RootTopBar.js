import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
import {
  AppBar,
  Toolbar,
  Badge,
  IconButton,
  Tooltip,
  Avatar,
  Menu,
  MenuItem,
} from "@material-ui/core";
import NotificationsIcon from "@material-ui/icons/NotificationsOutlined";
import { connect } from "react-redux";

import { useStyles } from "./rootTopBar.styles";
import { APIURL } from "~/services/api";

const RootTopBar = ({ signed, user }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications] = useState([]);

  const { role } = user;
  const classes = useStyles();

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar className={clsx(classes.root)}>
      <Toolbar>
        <RouterLink to="/">
          <img alt="Logo" src="/img/logoLargue.png" className={classes.logo} />
        </RouterLink>
        <div className={classes.flexGrow} />

        {signed && (
          <>
            <Tooltip title="Notificações">
              <IconButton className={classes.icon}>
                <Badge
                  badgeContent={notifications.length}
                  color="error"
                  variant="dot"
                >
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            <>
              <IconButton
                className={classes.icon}
                onClick={handleClick}
                arial-controls="menu"
              >
                <Tooltip title="Dashboard">
                  <Avatar
                    src={`${APIURL}/files/${user.avatar}`}
                    alt={user.firstName}
                  />
                </Tooltip>
              </IconButton>
              <Menu
                id="menu"
                anchorEl={anchorEl}
                keepMounted
                open={!!anchorEl}
                onClose={handleClose}
              >
                <MenuItem
                  component={RouterLink}
                  to={`/${role.role.toLowerCase()}/home`}
                >
                  Dashboard
                </MenuItem>
                <MenuItem
                  component={RouterLink}
                  to={`/${role.role.toLowerCase()}/account`}
                >
                  Perfil
                </MenuItem>
                <MenuItem component={RouterLink} to="/logout">
                  Sair
                </MenuItem>
              </Menu>
            </>
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
