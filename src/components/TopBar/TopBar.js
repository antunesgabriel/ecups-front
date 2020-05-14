import React, { useState } from "react";
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
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/NotificationsOutlined";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AppsIcon from "@material-ui/icons/Apps";
import { useStyles } from "./topBar.styles";
import { connect } from "react-redux";

const TopBar = ({ onSidebarOpen, user }) => {
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
        <>
          <Tooltip title="Voltar para pagina ligas disponíveis">
            <IconButton className={classes.icon} component={RouterLink} to="/">
              <AppsIcon />
            </IconButton>
          </Tooltip>
          <IconButton className={classes.icon}>
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
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
