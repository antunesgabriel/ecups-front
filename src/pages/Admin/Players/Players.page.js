/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";

import Layout from "~/layout/Layout";

import Toolbar from "~/components/Toolbar/Toolbar";
import DinamicTable from "~/components/DinamicTable/DinamicTable";
import api from "~/services/api";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import FeedbackActions from "~/redux/ducks/feedbackDuck";
import { ModalConfirm } from "~/components/ModalConfirm/ModalConfirm";
import PlayerForm from "./components/PlayerForm";

const cols = [
  { col: "", id: "col-avatar" },
  { col: "ID", id: "col-user-id" },
  { col: "Nome", id: "col-name" },
  { col: "Sobrenome", id: "col-surname" },
  { col: "Nickname", id: "col-nickname" },
  { col: "Email", id: "col-email" },
  { col: "Data de criação", id: "col-createdAt" },
];

const keys = [
  { key: "avatar", type: "img" },
  { key: "userId", type: "text" },
  { key: "name", type: "text" },
  { key: "surname", type: "text" },
  { key: "nickname", type: "text" },
  { key: "email", type: "text" },
  { key: "createdAt", type: "date" },
];

const PlayersPage = ({ setFeedback }) => {
  const [roles, setRole] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [choseItem, setChoseItem] = useState(null);
  const [openModalConfirm, setOpenModalConfirm] = useState(false);
  const [openForm, setOpenForm] = useState(false);

  const END_POINT = "/user";
  const ID = "userId";

  useEffect(() => {
    getList();
  }, []);

  // Pagination
  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(event.target.value);
  };

  // Delete
  const handleDeleteItem = (item) => {
    setOpenModalConfirm(true);
    setChoseItem(item);
  };

  const handleCloseModalConfirm = () => {
    setChoseItem(null);
    setOpenModalConfirm(false);
  };

  const handleConfirm = () => {
    setOpenModalConfirm(false);
    destroy();
  };

  // Edit
  const handleEditItem = (item) => {
    setChoseItem(item);
    setOpenForm(true);
  };

  const handleClickNewItem = () => {
    setChoseItem({
      name: "",
      surname: "",
      email: "",
      nickname: "",
      password: "",
    });
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setChoseItem(null);
  };

  // Requests
  const getList = async () => {
    try {
      const { data } = await api.get(
        `${END_POINT}?page=${page}&limit=${rowsPerPage}`
      );
      setRole(data.items);
    } catch (err) {
      if (err.response && err.response.status < 500) {
        return setFeedback("error", err.response.data.message);
      }
      return setFeedback("error", "Ops! Algo de errado aconteceu");
    }
  };

  const destroy = async () => {
    try {
      const { data } = await api.delete(`${END_POINT}/${choseItem[ID]}`);
      setFeedback("success", data.message);
      getList();
      setChoseItem(null);
    } catch (err) {
      if (err.response && err.response.status < 500) {
        setChoseItem(null);
        return setFeedback("error", err.response.data.message);
      }
      setChoseItem(null);
      return setFeedback("error", "Ops! Algo de errado aconteceu");
    }
  };

  return (
    <Layout>
      <ModalConfirm
        handleCloseModalConfirm={handleCloseModalConfirm}
        openModalConfirm={openModalConfirm}
        handleConfirm={handleConfirm}
      />
      {!!choseItem && (
        <PlayerForm
          setChoseItem={setChoseItem}
          item={choseItem}
          getList={getList}
          setFeedback={setFeedback}
          openForm={openForm}
          handleCloseForm={handleCloseForm}
        />
      )}
      <Toolbar handleClickNewItem={handleClickNewItem} />
      <DinamicTable
        items={roles}
        cols={cols}
        keys={keys}
        id={ID}
        handlePageChange={handlePageChange}
        handleRowsPerPageChange={handleRowsPerPageChange}
        rowsPerPage={rowsPerPage}
        page={page}
        handleDeleteItem={handleDeleteItem}
        handleEditItem={handleEditItem}
      />
    </Layout>
  );
};

const mapActionsToProps = (dispatch) =>
  bindActionCreators(FeedbackActions, dispatch);

export default connect(null, mapActionsToProps)(PlayersPage);
