import React from "react";
import { format, parseISO } from "date-fns";
import { Avatar, TableCell, Tooltip } from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

import AllInclusiveIcon from "@material-ui/icons/AllInclusive";

import { APIURL } from "~/services/api";

const Img = (src, item, key, classes) => {
  return (
    <TableCell key={key}>
      <div className={classes.nameContainer} key={key}>
        <Avatar className={classes.avatar} src={`${APIURL}/files/${src}`} />
      </div>
    </TableCell>
  );
};

const Text = (text, item, key) => <TableCell key={key}>{text}</TableCell>;

const Date = (date, item, key) => (
  <TableCell key={key}>
    {format(parseISO(date), "dd/MM/yyyy HH:mm:ss")}
  </TableCell>
);

const YesOrNo = (value, item, key, classes) => (
  <TableCell key={key} align="center">
    <Tooltip title={value ? "Habilitado" : "Desabilitado"}>
      <CheckCircleIcon
        size={14}
        color={value ? "action" : "disabled"}
        className={value ? classes.on : null}
      />
    </Tooltip>
  </TableCell>
);

const NumberOrInfinite = (number, item, key) => (
  <TableCell key={key} align="center">
    {!!number ? number : <AllInclusiveIcon color="inherit" size={14} />}
  </TableCell>
);

export const cellTypes = {
  Img,
  Text,
  Date,
  YesOrNo,
  NumberOrInfinite,
};
