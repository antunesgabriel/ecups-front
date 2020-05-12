import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import { CustomModal } from "~/components/CustomModal/CustomModal";
import api from "~/services/api";

const useStyles = makeStyles((theme) => ({
  none: {
    display: "none",
  },
  margin: {
    marginTop: theme.spacing(1),
  },
}));

const GameForm = ({
  item,
  handleCloseForm,
  getList,
  setFeedback,
  openForm,
}) => {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    game: item ? item.game : undefined,
    logo: item ? item.logo : undefined,
  });

  const classes = useStyles();
  const END_POINT = "/game";
  const ID = "gameId";

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setValues({
      ...values,
      logo: e.target.files[0],
    });
  };

  const handleSaveItem = () => {
    save(item, values);
  };

  const save = async (edit, itemData) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("game", itemData.game);
      if (typeof itemData.logo !== "string") {
        formData.append("logo", itemData.logo, itemData.logo.name);
      } else {
        formData.append("logo", itemData.logo);
      }

      if (edit[ID]) {
        const { data } = await api.put(`${END_POINT}/${item[ID]}`, formData);
        setFeedback("success", data.message);
      }

      if (!edit[ID]) {
        const { data } = await api.post(`${END_POINT}`, formData);
        setFeedback("success", data.message);
      }
      setLoading(false);
      handleCloseForm();
      getList();
    } catch (err) {
      if (err.response && err.response.status < 500) {
        handleCloseForm();
        return setFeedback("error", err.response.data.message);
      }
      setLoading(false);
      handleCloseForm();
      return setFeedback("error", "Ops! Algo de errado aconteceu");
    }
  };

  return (
    <CustomModal
      openForm={openForm}
      handleCloseForm={handleCloseForm}
      description={"Os games são para categorizar as ligas por games"}
      handleCancelForm={handleCloseForm}
      handleSaveItem={handleSaveItem}
      handleChange={handleChange}
      values={values}
      loading={loading}
      item={item}
    >
      <TextField
        fullWidth
        label="Nome do Game"
        margin="dense"
        name="game"
        onChange={handleChange}
        required
        value={values.game}
        variant="outlined"
      />
      <Button
        variant="outlined"
        size="large"
        fullWidth
        color="primary"
        component="label"
        className={classes.margin}
      >
        Selecionar nova logo do game
        <input
          name="logo"
          onChange={handleFileChange}
          required
          type="file"
          className={classes.none}
          accept="image/png,image/gif,image/jpeg"
        />
      </Button>
    </CustomModal>
  );
};

export default GameForm;
