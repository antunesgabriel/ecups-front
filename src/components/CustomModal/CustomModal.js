import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { CircularProgress } from "@material-ui/core";

export const CustomModal = ({
  openForm,
  handleCloseForm,
  item,
  description,
  handleCancelForm,
  handleSaveItem,
  loading,
  children,
}) => (
  <Dialog
    open={openForm}
    onClose={handleCloseForm}
    aria-labelledby="form-dialog-title"
  >
    <DialogTitle id="form-dialog-title">
      {item ? "Editar Item" : "Criar novo item"}
    </DialogTitle>
    <DialogContent>
      <DialogContentText>{description}</DialogContentText>
      {children}
    </DialogContent>
    <DialogActions>
      <Button onClick={handleCancelForm} color="default">
        Cancelar
      </Button>
      <Button onClick={handleSaveItem} color="primary" disabled={loading}>
        {loading ? <CircularProgress color="inherit" size={20} /> : "Salvar"}
      </Button>
    </DialogActions>
  </Dialog>
);
