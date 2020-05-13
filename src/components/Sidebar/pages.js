import React from "react";

import LoyaltyIcon from "@material-ui/icons/Loyalty";
import HomeIcon from "@material-ui/icons/Home";
import PeopleIcon from "@material-ui/icons/People";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import SettingsIcon from "@material-ui/icons/Settings";
import SportsEsportsIcon from "@material-ui/icons/SportsEsports";
import VideogameAssetIcon from "@material-ui/icons/VideogameAsset";
import GamepadIcon from "@material-ui/icons/Gamepad";
import PersonIcon from "@material-ui/icons/Person";

const ADMIN = [
  {
    title: "Home",
    href: "/admin/home",
    icon: <HomeIcon />,
  },
  {
    title: "Perfil",
    href: "/admin/account",
    icon: <PersonIcon />,
  },
  {
    title: "Games",
    href: "/admin/games",
    icon: <SportsEsportsIcon />,
  },
  {
    title: "Ligas",
    href: "/admin/leagues",
    icon: <GamepadIcon />,
  },
  {
    title: "Players",
    href: "/admin/players",
    icon: <PeopleIcon />,
  },
  {
    title: "Ocupações",
    href: "/admin/roles",
    icon: <LoyaltyIcon />,
  },
  {
    title: "Tipos de ligas",
    href: "/admin/league-types",
    icon: <VideogameAssetIcon />,
  },
];

const PLAYER = [
  {
    title: "Home",
    href: "/player/home",
    icon: <HomeIcon />,
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
