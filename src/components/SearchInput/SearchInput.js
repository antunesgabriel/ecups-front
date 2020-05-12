import React from "react";
import clsx from "clsx";
import { Paper, Input } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

import { useStyles } from "./searchInput.styles";

const SearchInput = ({ className, onChange, style, ...rest }) => {
  const classes = useStyles();

  return (
    <Paper {...rest} className={clsx(classes.root, className)} style={style}>
      <SearchIcon className={classes.icon} />
      <Input
        {...rest}
        className={classes.input}
        disableUnderline
        onChange={onChange}
      />
    </Paper>
  );
};

export default SearchInput;
