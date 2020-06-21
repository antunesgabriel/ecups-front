import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
import {
  AppBar,
  Toolbar,
  Badge,
  Hidden,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  withStyles,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/NotificationsOutlined";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AppsIcon from "@material-ui/icons/Apps";
import { connect } from "react-redux";
import api from "~/services/api";

import { useStyles } from "./topBar.styles";

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

const TopBar = ({ onSidebarOpen, user }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorNoti, setAnchorNoti] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    (async function () {
      const { notifications } = await getNotifications();
      setNotifications(notifications);
    })();
  }, []);

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

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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

  return (
    <AppBar className={clsx(classes.root)}>
      <Toolbar>
        <RouterLink to="/">
          <img alt="Logo" src="/img/logo.png" className={classes.logo} />
        </RouterLink>
        <div className={classes.flexGrow} />
        <>
          <Tooltip title="Voltar para pagina ligas disponíveis">
            <IconButton className={classes.icon} component={RouterLink} to="/">
              <AppsIcon />
            </IconButton>
          </Tooltip>
          <IconButton className={classes.icon} onClick={handleClickNoti}>
            <Badge badgeContent={notifications.length} color="primary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
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
              <Tooltip title="Opções">
                <MoreVertIcon />
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
