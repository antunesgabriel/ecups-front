/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";

import Layout from "~/layout/Layout";

import Toolbar from "~/components/Toolbar/Toolbar";
import DinamicTable from "~/components/DinamicTable/DinamicTable";
import api from "~/services/api";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import FeedbackActions from "~/redux/ducks/feedbackDuck";

const Game = ({ setFeedback }) => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    getGameList();
  }, []);

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

  const getGameList = async () => {
    try {
      const { data } = await api.get("/game");
      setGames(data.items);
    } catch (err) {
      if (err.response && err.response.status < 500) {
        return setFeedback("error", err.response.data.message);
      }
      return setFeedback("error", "Ops! Algo de errado aconteceu");
    }
  };

  return (
    <Layout>
      <Toolbar />
      <DinamicTable items={games} cols={cols} keys={keys} id="gameId" />
    </Layout>
  );
};

const mapActionsToProps = (dispatch) =>
  bindActionCreators(FeedbackActions, dispatch);

export default connect(null, mapActionsToProps)(Game);
