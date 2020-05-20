import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    authToken: "",
    player: "",
    playerGrid: [],
    enemyGrid: [],
    game: {},
    allowFire: false
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
        }
      }
    },
    setPlayerCell({ playerGrid }, row, col, value) {
      console.debug(value);
      playerGrid[row].cells[col].boat = value;
      console.debug(playerGrid[row].cells[col]);
    },
    setAllowFire(state, value) {
      state.allowFire = value;
    },
    addEnemyShot({ playerGrid }, shot) {
      const [row, col] = shot[0];
      const result = shot[1];
      playerGrid[row].cells[col].striked = result ? "hit" : "miss";
    },
    addShot({ enemyGrid }, shot) {
      const [row, col] = shot[0];
      const result = shot[1];
      enemyGrid[row].cells[col].striked = result ? "hit" : "miss";
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
    fire({ state, commit, dispatch }, row, col) {
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
            commit("setAllowFire", false);
            dispatch("waitForNextTurn");
          } else if (status.status === "Finished") {
            // Call end Game function
          }
        }
      });
      request.send("[" + row + "," + col + "]");
    },
    placeShip({ commit }, odlPosition, newPosition, shipName) {
      console.debug(shipName);
      console.debug(odlPosition);
      if (odlPosition.length > 0) {
        console.debug("Remove old position");
        for (let pos in odlPosition) {
          commit("setPlayerCell", pos[0], pos[1], false);
          console.debug(pos);
        }
      }
      let cpt = 0;
      console.debug(newPosition);
      for (let pos in newPosition) {
        console.debug(cpt);
        commit("setPlayerCell", pos[0], pos[1], shipName + "-" + cpt++);
      }
    },
    sendShipsPositions({ state }, ships) {
      const request = new XMLHttpRequest();
      request.open(
        "PATCH",
        "https://battleship-server-php.herokuapp.com/games/" +
          state.game.game_id +
          "/set-ships"
      );
      request.setRequestHeader("X-Auth", state.authToken);
      request.addEventListener("readystatechange", () => {
        if (
          request.readyState == XMLHttpRequest.DONE &&
          request.status == 201
        ) {
          /* To do */
        }
      });
      request.send(ships);
    },
    waitForNextTurn({ state, commit, dispatch }) {
      const request = new XMLHttpRequest();
      request.open(
        "GET",
        "https://battleship-server-php.herokuapp.com/games/" +
          state.game.game_id +
          "/last-shot"
      );
      request.setRequestHeader("X-Auth", state.authToken);
      request.addEventListener("readystatechange", () => {
        if (
          request.readyState == XMLHttpRequest.DONE &&
          request.status == 200
        ) {
          const { last_shot, status } = JSON.parse(request.responseText);
          if (status.status === "Finished") {
            console.debug("game finished, winner: " + status.winner);
          } else if (last_shot.player === state.player) {
            setTimeout(() => dispatch("waitForNextTurn"), 500);
          } else {
            commit("setAllowFire", true);
            commit("addEnemyShot", last_shot);
          }
        }
      });
      request.send();
    }
  },
  modules: {}
});
