import React from "react";

import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import SettingsIcon from "@material-ui/icons/Settings";

const ADMIN = [
  {
    title: "Home",
    href: "/admin/home",
    icon: <DashboardIcon />,
  },
  {
    title: "Usuários",
    href: "/admin/users",
    icon: <PeopleIcon />,
  },
  {
    title: "Conta",
    href: "/admin/account",
    icon: <AccountBoxIcon />,
  },
  {
    title: "Configurações",
    href: "/admin/settings",
    icon: <SettingsIcon />,
  },
];

const PLAYER = [
  {
    title: "Home",
    href: "/player/home",
    icon: <DashboardIcon />,
  },
  {
    title: "Usuários",
    href: "/player/users",
    icon: <PeopleIcon />,
  },
  {
    title: "Conta",
    href: "/player/account",
    icon: <AccountBoxIcon />,
  },
  {
    title: "Configurações",
    href: "/player/settings",
    icon: <SettingsIcon />,
  },
];

export default { PLAYER, ADMIN };
