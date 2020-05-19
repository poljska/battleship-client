import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    authToken: "",
    player: "",
    playerGrid: [],
    enemyGrid: [],
    game: {}
  },
  mutations: {
    setAuthToken(state, authToken) {
      state.authToken = authToken;
    },
    setPlayer(state, player) {
      state.player = player;
    },
    setGameId(state, gameId) {
      state.game.game_id = gameId;
    },
    setGame(state, game) {
      state.game = game;
    },
    initGrids(state) {
      state.playerGrid = [];
      state.enemyGrid = [];

      for (let i = 0; i < 10; i++) {
        state.playerGrid.push({ index: i, cells: [] });
        state.enemyGrid.push({ index: i, cells: [] });
        for (let j = 0; j < 10; j++) {
          state.playerGrid[i].cells.push({
            index: j,
            boat: false,
            striked: false
          });
          state.enemyGrid[i].cells.push({
            index: j,
            boat: false,
            striked: false
          });
          console.debug("i: " + i + " j: " + j);
        }
      }
    }
  },
  actions: {
    createNewGame({ commit, dispatch }) {
      const request = new XMLHttpRequest();
      request.open("POST", "https://battleship-server-php.herokuapp.com/games");
      request.addEventListener("readystatechange", () => {
        if (
          request.readyState == XMLHttpRequest.DONE &&
          request.status == 201
        ) {
          const { game_id } = JSON.parse(request.responseText);
          commit("setGameId", game_id);
          dispatch("joinGame", game_id);
        }
      });
      request.send(null);
    },
    joinGame({ commit, dispatch }, game_id) {
      const request = new XMLHttpRequest();
      request.open(
        "POST",
        "https://battleship-server-php.herokuapp.com/games/" + game_id + "/join"
      );
      request.addEventListener("readystatechange", () => {
        if (
          request.readyState == XMLHttpRequest.DONE &&
          request.status == 200
        ) {
          const response = JSON.parse(request.responseText);
          commit("setPlayer", response["player"]);
          commit("setAuthToken", response["X-Auth"]);
          dispatch("getGameInfo");
        }
      });
      request.send();
    },
    getGameInfo({ state, commit }) {
      const request = new XMLHttpRequest();
      request.open(
        "GET",
        "https://battleship-server-php.herokuapp.com/games/" +
          state.game.game_id +
          "/current"
      );
      request.setRequestHeader("X-Auth", state.authToken);
      request.addEventListener("readystatechange", () => {
        if (
          request.readyState == XMLHttpRequest.DONE &&
          request.status == 200
        ) {
          const game = JSON.parse(request.responseText);
          commit("setGame", game);
          commit("initGrids");
        }
      });
      request.send();
    },
    fire({ state, commit }, row, col) {
      const request = new XMLHttpRequest();
      request.open(
        "PATCH",
        "https://battleship-server-php.herokuapp.com/games/" +
          state.game.game_id +
          "/fire"
      );
      request.setRequestHeader("X-Auth", state.authToken);
      request.setRequestHeader("Content-Type", "application/json");
      request.addEventListener("readystatechange", () => {
        if (
          request.readyState == XMLHttpRequest.DONE &&
          request.status == 200
        ) {
          let { shot, status } = JSON.parse(request.responseText);
          commit("addShot", shot);
          if (status.status === "InProgress") {
            // Call wait for next turn function
          } else if (status.status === "Finished") {
            // Call end Game function
          }
        }
      });
      request.send("[" + row + "," + col + "]");
    }
  },
  modules: {}
});
