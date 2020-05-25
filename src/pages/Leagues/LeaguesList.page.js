/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Layout from "~/layout/Layout";

import Toolbar from "~/components/Toolbar/Toolbar";
import DinamicTable from "~/components/DinamicTable/DinamicTable";
import api from "~/services/api";
import FeedbackActions from "~/redux/ducks/feedbackDuck";
import { ModalConfirm } from "~/components/ModalConfirm/ModalConfirm";
import { useHistory } from "react-router-dom";

const cols = [
  { col: "Liga", id: "col-league" },
  { col: "Ida e volta", id: "col-roundTrip" },
  { col: "Limite de Participantes", id: "col-maxParticipants" },
  { col: "Inicio", id: "col-leagueStart" },
  { col: "Fim", id: "col-leagueEnd" },
  { col: "Endereço", id: "col-needAddress" },
  { col: "Tipo", id: "col-leagueType" },
  { col: "Game", id: "col-game" },
];

const keys = [
  { key: "league", type: "text" },
  { key: "roundTrip", type: "yesOrNo" },
  { key: "maxParticipants", type: "numberOrInfinite" },
  { key: "leagueStart", type: "date" },
  { key: "leagueEnd", type: "date" },
  { key: "needAddress", type: "yesOrNo" },
  { key: "leagueType.type", type: "text" },
  { key: "game.logo", type: "img" },
];

function LeaguesListPage({ setFeedback, role }) {
  const [leagues, setLeagues] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [choseItem, setChoseItem] = useState(null);
  const [openModalConfirm, setOpenModalConfirm] = useState(false);
  const [myRole] = useState(role.role.toLowerCase());

  const END_POINT = "/league";
  const ID = "leagueId";
  const history = useHistory();

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
    history.push(`/${myRole}/league/create?leagueId=${item.leagueId}`);
  };

  // Create
  const handleClickNewItem = () => {
    history.push(`/${myRole}/league/create`);
  };

  // Requests
  const getList = async () => {
    try {
      const { data } = await api.get(
        `${END_POINT}?page=${page}&limit=${rowsPerPage}`
      );
      setLeagues(data.items);
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
      <Toolbar handleClickNewItem={handleClickNewItem} />
      <DinamicTable
        items={leagues}
        cols={cols}
        keys={keys}
        id={ID}
        handlePageChange={handlePageChange}
        handleRowsPerPageChange={handleRowsPerPageChange}
        rowsPerPage={rowsPerPage}
        page={page}
        handleDeleteItem={handleDeleteItem}
        handleEditItem={handleEditItem}
        message="Clique em NOVO para criar uma nova liga/campeonato"
      />
    </Layout>
  );
}

const mapStateToProps = (state) => ({
  role: state.user.user.role,
});

const mapActionsToProps = (dispatch) =>
  bindActionCreators(FeedbackActions, dispatch);

export default connect(mapStateToProps, mapActionsToProps)(LeaguesListPage);
