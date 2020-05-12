import React from "react";
import clsx from "clsx";
import PerfectScrollbar from "react-perfect-scrollbar";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

import { APIURL } from "~/services/api";

import { useStyles } from "./dinamicTable.styles";
import { format } from "date-fns";

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

  const types = {
    img: (src, item, key) => (
      <TableCell key={key}>
        <div className={classes.nameContainer} key={key}>
          <Avatar className={classes.avatar} src={`${APIURL}/files/${src}`} />
        </div>
      </TableCell>
    ),
    text: (text, item, key) => <TableCell key={key}>{text}</TableCell>,
    date: (date, item, key) => (
      <TableCell key={key}>{format(date, "dd/MM/YYYY HH:mm:ss")}</TableCell>
    ),
  };

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
                          types[key.type](
                            item[key.key],
                            item,
                            `td-${item[id]}-${key.key}`
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
