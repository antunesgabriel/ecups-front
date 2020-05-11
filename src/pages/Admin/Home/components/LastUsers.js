import React from "react";
import clsx from "clsx";
import { Avatar } from "@material-ui/core";
import { format, parseISO } from "date-fns";
import PerfectScrollbar from "react-perfect-scrollbar";
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardActions,
  CardHeader,
  CardContent,
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";

import { APIURL } from "~/services/api";
import history from "~/utils/history";

const useStyles = makeStyles((theme) => ({
  root: {},
  content: {
    padding: 0,
  },
  inner: {
    minWidth: 800,
  },
  statusContainer: {
    display: "flex",
    alignItems: "center",
  },
  status: {
    marginRight: theme.spacing(1),
  },
  actions: {
    justifyContent: "flex-end",
  },
  avatar: {
    small: {
      width: theme.spacing(4),
      height: theme.spacing(4),
    },
  },
  body: {
    overflowX: "scroll",
  },
}));

const LastUsers = ({ className, users, ...rest }) => {
  const classes = useStyles();

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader
        // action={
        //   <Button color="primary" size="small" variant="outlined">
        //     Cadastrar
        //   </Button>
        // }
        title="Ultimos usuários"
      />
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>Nome Completo</TableCell>
                  <TableCell>Nickname</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Data</TableCell>
                  <TableCell>Role</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className={classes.body}>
                {users.map((user) => (
                  <TableRow hover key={user.userId}>
                    <TableCell>
                      <Avatar
                        alt={user.name}
                        src={`${APIURL}/files/${user.avatar}`}
                        className={classes.avatar}
                      />
                    </TableCell>
                    <TableCell>
                      {user.name} {user.surname}
                    </TableCell>
                    <TableCell>{user.nickname}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      {format(parseISO(user.createdAt), "dd/MM/Y")}
                    </TableCell>
                    <TableCell>{user.role.role}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <Divider />
      <CardActions className={classes.actions}>
        <Button
          color="primary"
          size="small"
          variant="text"
          onClick={() => history.push("/admin/users")}
        >
          Ver todos <ArrowRightIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

export default LastUsers;
