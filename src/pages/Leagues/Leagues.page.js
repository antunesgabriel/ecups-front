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
import history from "~/utils/history";

import LeagueForm from "./components/LeagueForm";

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

const PlayersPage = ({ setFeedback }) => {
  const [roles, setRole] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [choseItem, setChoseItem] = useState(null);
  const [openModalConfirm, setOpenModalConfirm] = useState(false);
  const [games, setGames] = useState([]);
  const [leagueTypes, setLeagueTypes] = useState([]);
  const [openForm, setOpenForm] = useState(false);

  const END_POINT = "/league";
  const ID = "leagueId";

  useEffect(() => {
    getList();
    getGameAndTypes();
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
      league: "",
      rules: "",
      description: "",
      roundTrip: false,
      maxParticipants: 1,
      forTeams: false,
      leagueStart: "",
      leagueEnd: "",
      needAddress: false,
      leagueTypeId: undefined,
      gameId: undefined,
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

  const getGameAndTypes = async () => {
    try {
      const [response1, response2] = await Promise.all([
        api.get("/game/all"),
        api.get("/league-type/all"),
      ]);

      if (!response1.data.length) {
        setFeedback(
          "warning",
          "Ainda não possuimos games cadastrados para criar ligas/campeonatos, entre em contato com suporte e peça seu game =D"
        );
        history.push("/");
        return;
      }

      if (!response2.data.length) {
        setFeedback(
          "warning",
          "Ainda não possuimos tipos de ligas/campeonatos cadastrados para criar ligas/campeonatos"
        );
        history.push("/");
        return;
      }

      setGames(response1.data);
      setLeagueTypes(response2.data);
    } catch (err) {
      if (err.response && err.response.status < 500) {
        return setFeedback("error", err.response.data.message);
      }
      return setFeedback("error", "Ops! Algo de errado aconteceu ao tentar");
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
        <LeagueForm
          setChoseItem={setChoseItem}
          item={choseItem}
          getList={getList}
          setFeedback={setFeedback}
          openForm={openForm}
          handleCloseForm={handleCloseForm}
          leagueTypes={leagueTypes}
          games={games}
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
        message="Clique em NOVO para criar uma nova liga/campeonato"
      />
    </Layout>
  );
};

const mapActionsToProps = (dispatch) =>
  bindActionCreators(FeedbackActions, dispatch);

export default connect(null, mapActionsToProps)(PlayersPage);
