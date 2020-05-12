import React, { useState } from "react";
import clsx from "clsx";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
} from "@material-ui/core";

import { APIURL } from "~/services/api";

import { useStyles } from "./dinamicTable.styles";
import { format } from "date-fns";

const DinamicTable = ({ className, cols, keys, items, id, ...rest }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const classes = useStyles();

  const handleSelectAll = (event) => {
    let selectedItems;

    if (event.target.checked) {
      selectedItems = items.map((items) => items[id]);
    } else {
      selectedItems = [];
    }

    setSelectedItems(selectedItems);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedItems.indexOf(id);
    let newSelectedItems = [];

    if (selectedIndex === -1) {
      newSelectedItems = newSelectedItems.concat(selectedItems, id);
    } else if (selectedIndex === 0) {
      newSelectedItems = newSelectedItems.concat(selectedItems.slice(1));
    } else if (selectedIndex === selectedItems.length - 1) {
      newSelectedItems = newSelectedItems.concat(selectedItems.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedItems = newSelectedItems.concat(
        selectedItems.slice(0, selectedIndex),
        selectedItems.slice(selectedIndex + 1)
      );
    }

    setSelectedItems(newSelectedItems);
  };

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(event.target.value);
  };

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
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={
                        !!selectedItems.length &&
                        selectedItems.length === items.length
                      }
                      color="primary"
                      indeterminate={
                        selectedItems.length > 0 &&
                        selectedItems.length < items.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  {cols.map((col) => (
                    <TableCell key={col.id}>{col.col}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {!!items.length && (
                  <>
                    {items.slice(0, rowsPerPage).map((item) => (
                      <TableRow
                        hover
                        key={item[id]}
                        selected={selectedItems.indexOf(item[id]) !== -1}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={selectedItems.indexOf(item[id]) !== -1}
                            color="primary"
                            onChange={(event) =>
                              handleSelectOne(event, item[id])
                            }
                            value="true"
                          />
                        </TableCell>

                        {keys.map((key) =>
                          types[key.type](
                            item[key.key],
                            item,
                            `td-${item[id]}-${key.key}`
                          )
                        )}
                      </TableRow>
                    ))}
                  </>
                )}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
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
