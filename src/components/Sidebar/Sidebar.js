import React from "react";
import clsx from "clsx";
import { Drawer } from "@material-ui/core";

import SidebarNav from "./SidebarNav.partial";

import { useStyles } from "./sidebar.styles";

import pages from "./pages";
import { connect } from "react-redux";

const Sidebar = ({ open, variant, onClose, className, user, ...rest }) => {
  const classes = useStyles();

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div {...rest} className={clsx(classes.root, className)}>
        <SidebarNav className={classes.nav} pages={pages[user.role.role]} />
      </div>
    </Drawer>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Sidebar);
