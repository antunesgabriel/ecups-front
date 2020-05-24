import React from "react";

import LoyaltyIcon from "@material-ui/icons/Loyalty";
import HomeIcon from "@material-ui/icons/Home";
import PeopleIcon from "@material-ui/icons/People";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import SecurityIcon from "@material-ui/icons/Security";
import SportsEsportsIcon from "@material-ui/icons/SportsEsports";
import VideogameAssetIcon from "@material-ui/icons/VideogameAsset";
import GamepadIcon from "@material-ui/icons/Gamepad";
import PersonIcon from "@material-ui/icons/Person";
import AssignmentIcon from "@material-ui/icons/Assignment";
import EmailIcon from "@material-ui/icons/Email";

const ADMIN = [
  {
    title: "Inicio",
    href: "/admin/home",
    icon: <HomeIcon />,
  },
  {
    title: "Perfil",
    href: "/admin/perfil",
    icon: <PersonIcon />,
  },
  {
    title: "Games",
    href: "/admin/games",
    icon: <SportsEsportsIcon />,
  },
  {
    title: "Ligas",
    icon: <GamepadIcon />,
    nesteds: [
      {
        title: "Listar",
        href: "/admin/leagues",
      },
      {
        title: "Criar",
        href: "/admin/league/create",
      },
    ],
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
    title: "Inicio",
    href: "/player/home",
    icon: <HomeIcon />,
  },
  {
    title: "Time",
    href: "/player/team",
    icon: <SecurityIcon />,
  },
  {
    title: "Perfil",
    href: "/player/perfil",
    icon: <AccountBoxIcon />,
  },
  {
    title: "Convites",
    href: "/player/invitations",
    icon: <EmailIcon />,
  },
  {
    title: "Inscrições",
    href: "/player/subscriptions",
    icon: <AssignmentIcon />,
  },
  {
    title: "Minhas Ligas",
    icon: <GamepadIcon />,
    nesteds: [
      {
        title: "Listar",
        href: "/player/leagues",
      },
      {
        title: "Criar",
        href: "/player/league/create",
      },
    ],
  },
];

export default { PLAYER, ADMIN };
