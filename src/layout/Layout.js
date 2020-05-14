import React, { useState } from "react";
import clsx from "clsx";
import { useTheme } from "@material-ui/styles";
import { useMediaQuery } from "@material-ui/core";

import { useStyles } from "./layout.styles";
import TopBar from "~/components/TopBar/TopBar";
import Sidebar from "~/components/Sidebar/Sidebar";
import Footer from "~/components/Footer/Footer";

const Layout = ({ children }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"), {
    defaultMatches: true,
  });

  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };

  const shouldOpenSidebar = isDesktop ? true : openSidebar;

  return (
    <div
      className={clsx({
        [classes.root]: true,
        [classes.shiftContent]: isDesktop,
      })}
    >
      <TopBar onSidebarOpen={handleSidebarOpen} />
      <Sidebar
        onClose={handleSidebarClose}
        open={shouldOpenSidebar}
        variant={isDesktop ? "persistent" : "temporary"}
      />

      <main className={classes.content}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
