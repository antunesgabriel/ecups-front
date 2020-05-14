import React, { useState } from "react";
import clsx from "clsx";
import { bindActionCreators } from "redux";
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Typography,
  Divider,
  Button,
  LinearProgress,
} from "@material-ui/core";
import { connect } from "react-redux";

import UserActions from "~/redux/ducks/userDuck";
import FeedbackActions from "~/redux/ducks/feedbackDuck";
import api, { APIURL } from "~/services/api";

import { useStyles } from "./perfilProfile.styles";

const PerfilProfile = ({
  user,
  className,
  setFeedback,
  setUserAvatar,
  ...rest
}) => {
  const [progress, setProgress] = useState({ show: false, progress: 0 });
  const classes = useStyles();

  const fileSelectorHandler = (e) => {
    const avatar = e.target.files[0];
    const formData = new FormData();
    formData.append("avatar", avatar, avatar.name);
    uploadAvatarHandler(formData);
  };

  const uploadAvatarHandler = async (formData) => {
    try {
      const { data } = await api.post("/avatar", formData, {
        onUploadProgress: progressUploadHandler,
      });
      setProgress({ show: false, progress: 0 });
      setUserAvatar(data.filename);
    } catch (err) {
      if (err.response && err.response.status < 500) {
        setProgress({ show: false, progress: 0 });
        return setFeedback("error", err.response.data.message);
      }
      setProgress({ show: false, progress: 0 });

      setFeedback(
        "error",
        "Ops, algo de errado aconteceu, tente novamente mais tarde"
      );
    }
  };

  const progressUploadHandler = (progressEvent) => {
    setProgress({
      show: true,
      progress: Math.round((progressEvent.loaded / progressEvent.total) * 100),
    });
  };

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
        {progress.show && (
          <div className={classes.progress}>
            <Typography variant="body2" className={classes.progressLabel}>
              Progresso: {progress.progress}%
            </Typography>
            <LinearProgress value={progress.progress} variant="determinate" />
          </div>
        )}
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          className={classes.uploadButton}
          color="primary"
          variant="text"
          component="label"
        >
          Escolher nova foto
          <input
            className={classes.file}
            color="primary"
            type="file"
            name="avatar"
            onChange={fileSelectorHandler}
            accept="image/png,image/gif,image/jpeg"
          />
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

export default connect(mapStateToProps, mapActionsToProps)(PerfilProfile);
