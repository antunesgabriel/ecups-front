import React, { useState } from "react";
import { TextField } from "@material-ui/core";

import { CustomModal } from "~/components/CustomModal/CustomModal";
import api from "~/services/api";

const PlayerForm = ({
  item,
  handleCloseForm,
  getList,
  setFeedback,
  openForm,
}) => {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    name: item ? item.name : undefined,
    surname: item ? item.surname : undefined,
    email: item ? item.email : undefined,
    nickname: item ? item.nickname : undefined,
    password: "",
  });

  const END_POINT = "/user";
  const ID = "userId";

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveItem = () => {
    save(item, values);
  };

  const save = async (edit, itemData) => {
    try {
      setLoading(true);
      if (edit[ID]) {
        const { data } = await api.put(`${END_POINT}/${item[ID]}`, itemData);
        setFeedback("success", data.message);
      }

      if (!edit[ID]) {
        const { data } = await api.post(`${END_POINT}`, itemData);
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
      description={"As informções dos usuarios devem ser mantidas em sigilo"}
      handleCancelForm={handleCloseForm}
      handleSaveItem={handleSaveItem}
      handleChange={handleChange}
      values={values}
      loading={loading}
      item={item}
    >
      <TextField
        fullWidth
        label="Nome"
        margin="dense"
        name="name"
        onChange={handleChange}
        required
        value={values.name}
        variant="outlined"
      />
      <TextField
        fullWidth
        label="Sobrenome"
        margin="dense"
        name="surname"
        onChange={handleChange}
        required
        value={values.surname}
        variant="outlined"
      />
      <TextField
        fullWidth
        label="Nickname"
        margin="dense"
        name="nickname"
        onChange={handleChange}
        required
        value={values.nickname}
        variant="outlined"
      />
      <TextField
        fullWidth
        label="Email"
        margin="dense"
        name="email"
        onChange={handleChange}
        required
        value={values.email}
        variant="outlined"
      />
      {!item[ID] && (
        <TextField
          fullWidth
          label="Senha"
          margin="dense"
          name="password"
          onChange={handleChange}
          required
          type="password"
          value={values.password}
          variant="outlined"
        />
      )}
    </CustomModal>
  );
};

export default PlayerForm;
