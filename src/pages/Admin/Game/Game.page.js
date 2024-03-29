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
import GameForm from "./components/GameForm";

const cols = [
  { col: "Logo", id: "col-logo" },
  { col: "ID", id: "col-id" },
  { col: "Game", id: "col-game" },
];

const keys = [
  { key: "logo", type: "img" },
  { key: "gameId", type: "text" },
  { key: "game", type: "text" },
];

const GamePage = ({ setFeedback }) => {
  const [games, setGames] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [choseItem, setChoseItem] = useState(null);
  const [openModalConfirm, setOpenModalConfirm] = useState(false);
  const [openForm, setOpenForm] = useState(false);

  const END_POINT = "/game";
  const ID = "gameId";

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
    setChoseItem({ game: "", logo: "" });
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
      setGames(data.items);
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
        <GameForm
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
        items={games}
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

export default connect(null, mapActionsToProps)(GamePage);
