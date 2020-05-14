import React from "react";
import clsx from "clsx";
import PerfectScrollbar from "react-perfect-scrollbar";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import {
  Card,
  CardActions,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  Typography,
  capitalize,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

import { resolveObjectPath } from "~/helpers/resolveObjectPath";

import { useStyles } from "./dinamicTable.styles";
import { cellTypes } from "./cellTypes";

const DinamicTable = ({
  className,
  cols,
  keys,
  items,
  id,
  rowsPerPage,
  handlePageChange,
  handleRowsPerPageChange,
  handleDeleteItem,
  handleEditItem,
  page,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  {cols.map((col) => (
                    <TableCell key={col.id}>{col.col}</TableCell>
                  ))}
                  <TableCell />
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {!!items.length && (
                  <>
                    {items.slice(0, rowsPerPage).map((item) => (
                      <TableRow hover key={item[id]}>
                        {keys.map((key) =>
                          cellTypes[capitalize(key.type)](
                            resolveObjectPath(item, key.key),
                            item,
                            `td-${item[id]}-${key.key}`,
                            classes
                          )
                        )}
                        <TableCell padding="checkbox">
                          <IconButton
                            aria-label="delete"
                            onClick={() => handleEditItem(item)}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </TableCell>
                        <TableCell padding="checkbox">
                          <IconButton
                            aria-label="delete"
                            onClick={() => handleDeleteItem(item)}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                )}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
        {!items.length && (
          <div className={classes.tableEmpty}>
            <Typography variant="caption">
              Clique em <b>novo</b> para adcionar um item
            </Typography>
          </div>
        )}
      </CardContent>
      <CardActions className={classes.actions}>
        <TablePagination
          component="div"
          count={items.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </CardActions>
    </Card>
  );
};

export default DinamicTable;
