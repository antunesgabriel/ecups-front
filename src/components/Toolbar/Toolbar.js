import React from "react";
import clsx from "clsx";
import { Button } from "@material-ui/core";

// import SearchInput from "../SearchInput/SearchInput";

import { useStyles } from "./toolbar.styles";

const Toolbar = ({ className, handleClickNewItem, ...rest }) => {
  const classes = useStyles();

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <div className={classes.row}>
        <span className={classes.spacer} />
        <Button className={classes.importButton}>Importar</Button>
        <Button className={classes.exportButton}>Exportar</Button>
        <Button
          color="primary"
          variant="contained"
          onClick={handleClickNewItem}
        >
          Novo
        </Button>
      </div>
      {/* <div className={classes.row}>
        <SearchInput
          className={classes.searchInput}
          placeholder="Search user"
          onChange={() => {}}
        />
      </div> */}
    </div>
  );
};

export default Toolbar;
