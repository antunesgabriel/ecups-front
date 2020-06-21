import React, { useState, useEffect } from "react";
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
  withStyles,
  Typography,
} from "@material-ui/core";
import NotificationsIcon from "@material-ui/icons/NotificationsOutlined";
import { connect } from "react-redux";

import { useStyles } from "./rootTopBar.styles";
import api, { APIURL } from "~/services/api";

const StyledMenu = withStyles({})((props) => (
  <Menu
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const RootTopBar = ({ signed, user }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorNoti, setAnchorNoti] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (signed) {
      (async function () {
        const { notifications } = await getNotifications();
        setNotifications(notifications);
      })();
    }
  }, [signed]);

  const { role } = user;
  const classes = useStyles();

  const getNotifications = async () => {
    try {
      const { data } = await api.get("/notification");
      return data;
    } catch (err) {
      return { notifications: [] };
    }
  };

  const handleClickNoti = (e) => {
    setAnchorNoti(e.currentTarget);
  };

  const handleCloseNoti = () => {
    setAnchorNoti(null);
    handleReadNoti();
  };

  const handleReadNoti = async () => {
    try {
      await api.put("/notification");
      const { notifications } = await getNotifications();
      setNotifications(notifications);
    } catch (err) {
      setNotifications([]);
    }
  };

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
          <img alt="Logo" src="/img/logo.png" className={classes.logo} />
        </RouterLink>
        <div className={classes.flexGrow} />

        {signed && (
          <>
            <Tooltip title="Notificações">
              <IconButton className={classes.icon} onClick={handleClickNoti}>
                <Badge badgeContent={notifications.length} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            <StyledMenu
              id="customized-menu"
              anchorEl={anchorNoti}
              keepMounted
              open={Boolean(anchorNoti)}
              onClose={handleCloseNoti}
            >
              {notifications.length ? (
                <>
                  {notifications.map((noti) => (
                    <MenuItem
                      className={classes.nofitications}
                      key={noti._id}
                      component={RouterLink}
                      to={noti.link}
                    >
                      <Typography variant="caption" color="textPrimary">
                        {noti.message}
                      </Typography>
                    </MenuItem>
                  ))}
                </>
              ) : (
                <MenuItem disabled>
                  <Typography variant="body2">Sem notificações</Typography>
                </MenuItem>
              )}
            </StyledMenu>
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
                  to={`/${role.role.toLowerCase()}/perfil`}
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
