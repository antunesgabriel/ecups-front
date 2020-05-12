import React, { useState } from "react";
import { TextField } from "@material-ui/core";

import { CustomModal } from "~/components/CustomModal/CustomModal";
import api from "~/services/api";

const RoleForm = ({
  item,
  handleCloseForm,
  getList,
  setFeedback,
  openForm,
}) => {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    role: item ? item.role : undefined,
  });

  const END_POINT = "/role";
  const ID = "roleId";

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
      description={
        "Os tipos de ligas são para categorizar o modo de tabelamento e disputa da liga"
      }
      handleCancelForm={handleCloseForm}
      handleSaveItem={handleSaveItem}
      handleChange={handleChange}
      values={values}
      loading={loading}
      item={item}
    >
      <TextField
        fullWidth
        label="Função"
        margin="dense"
        name="role"
        onChange={handleChange}
        required
        value={values.role}
        variant="outlined"
      />
    </CustomModal>
  );
};

export default RoleForm;
