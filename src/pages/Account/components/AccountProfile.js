import React from "react";
import clsx from "clsx";

import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Typography,
  Divider,
  Button,
  // LinearProgress,
} from "@material-ui/core";

import { useStyles } from "./accountProfile.styles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import UserActions from "~/redux/ducks/userDuck";
import FeedbackActions from "~/redux/ducks/feedbackDuck";
import { APIURL } from "~/services/api";

const AccountProfile = ({ user, className, ...rest }) => {
  const classes = useStyles();

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent>
        <div className={classes.details}>
          <div>
            <Typography gutterBottom variant="h3">
              {user.name} {user.surname}
            </Typography>
            <Typography
              className={classes.locationText}
              color="textSecondary"
              variant="body1"
            >
              @{user.nickname}
            </Typography>
          </div>
          <Avatar
            className={classes.avatar}
            src={`${APIURL}/files/${user.avatar}`}
            alt={`${user.name} ${user.surname}`}
          />
        </div>
        {/* <div className={classes.progress}>
          <Typography variant="body1">Profile Completeness: 70%</Typography>
          <LinearProgress value={70} variant="determinate" />
        </div> */}
      </CardContent>
      <Divider />
      <CardActions>
        <Button className={classes.uploadButton} color="primary" variant="text">
          Escolher nova foto
        </Button>
        <Button variant="text">Remove foto</Button>
      </CardActions>
    </Card>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user,
});

const mapActionsToProps = (dispatch) =>
  bindActionCreators({ ...UserActions, ...FeedbackActions }, dispatch);

export default connect(mapStateToProps, mapActionsToProps)(AccountProfile);
