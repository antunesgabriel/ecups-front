/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { forwardRef, useState } from "react";
import { NavLink as RouterLink } from "react-router-dom";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import clsx from "clsx";

import { makeStyles } from "@material-ui/styles";
import { List, ListItem, Button, colors, Collapse } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {},
  item: {
    display: "flex",
    paddingTop: 0,
    paddingBottom: 0,
  },
  button: {
    color: colors.grey[500],
    padding: "10px 8px",
    justifyContent: "flex-start",
    textTransform: "none",
    letterSpacing: 0,
    width: "100%",
    fontWeight: theme.typography.fontWeightMedium,
  },
  buttonNested: {
    color: colors.grey[500],
    padding: "10px 8px",
    justifyContent: "space-between",
    textTransform: "none",
    letterSpacing: 0,
    width: "100%",
    fontWeight: theme.typography.fontWeightMedium,
  },
  icon: {
    color: theme.palette.icon,
    width: 24,
    height: 24,
    display: "flex",
    alignItems: "center",
    marginRight: theme.spacing(1),
  },
  inline: {
    display: "flex",
    flexDirection: "row",
  },
  active: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    "& $icon": {
      color: theme.palette.primary.main,
    },
  },
  nested: {
    paddingLeft: theme.spacing(2),
  },
}));

const CustomRouterLink = forwardRef((props, ref) => (
  <div ref={ref} style={{ flexGrow: 1 }}>
    <RouterLink {...props} />
  </div>
));

const Normal = ({ classes, page }) => (
  <ListItem className={classes.item} disableGutters key={page.title}>
    <Button
      activeClassName={classes.active}
      className={classes.button}
      component={CustomRouterLink}
      to={page.href}
    >
      <div className={classes.icon}>{page.icon}</div>
      {page.title}
    </Button>
  </ListItem>
);

const Nested = ({ open, handleOpenNested, classes, page }) => (
  <>
    <ListItem className={classes.item} disableGutters>
      <Button className={classes.buttonNested} onClick={handleOpenNested}>
        <div className={classes.inline}>
          <div className={classes.icon}>{page.icon}</div>
          {page.title}
        </div>
        <KeyboardArrowDownIcon />
      </Button>
    </ListItem>
    <Collapse in={open} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        {page.nesteds.map((nested) => (
          <ListItem
            disableGutters
            className={classes.item}
            key={`${nested.title}${nested.href}`}
          >
            <Button
              activeClassName={classes.active}
              className={classes.button}
              component={CustomRouterLink}
              to={nested.href}
            >
              <span className={classes.nested}>{nested.title}</span>
            </Button>
          </ListItem>
        ))}
      </List>
    </Collapse>
  </>
);

const SidebarNav = ({ pages, className, ...rest }) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const handleOpenNested = () => setOpen(!open);

  return (
    <List {...rest} className={clsx(classes.root, className)}>
      {pages.map((page) => (
        <div key={page.title}>
          {!!page.nesteds ? (
            <Nested
              classes={classes}
              page={page}
              handleOpenNested={handleOpenNested}
              open={open}
            />
          ) : (
            <Normal classes={classes} page={page} />
          )}
        </div>
      ))}
    </List>
  );
};

export default SidebarNav;
