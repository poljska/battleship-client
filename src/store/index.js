import Vue from "vue";
import Vuex from "vuex";
import { vueInstance } from "@/main.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    authToken: "",
    player: "",
    playerGrid: [],
    enemyGrid: [],
    game: {},
    allowFire: false,
    ships: {
      carrier: [],
      destroyer: [],
      submarine: [],
      battleship: [],
      patrol_boat: []
    }
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
    setPlayerCell({ playerGrid }, { row, col, value }) {
      playerGrid[row - 1].cells[col - 1].boat = value;
    },
    setAllowFire(state, value) {
      state.allowFire = value;
    },
    addEnemyShot(state, shot) {
      console.debug(shot);
      const [row, col] = shot[0];
      const result = shot[1];
      state.playerGrid[row - 1].cells[col - 1].striked = result
        ? "hit"
        : "miss";
    },
    addShot({ enemyGrid }, shot) {
      const [row, col] = shot[0];
      const result = shot[1];
      enemyGrid[row - 1].cells[col - 1].striked = result ? "hit" : "miss";
    },
    setShipPosition(state, { shipName, position }) {
      state.ships[shipName] = position;
      console.debug(state.ships[shipName]);
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
          dispatch("joinGame", game_id);
          commit("setAllowFire", true);
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
        if (request.readyState == XMLHttpRequest.DONE) {
          let response = "";
          if (request.responseText) response = JSON.parse(request.responseText);
          switch (request.status) {
            case 200:
              commit("setGameId", game_id);
              commit("setPlayer", response["player"]);
              commit("setAuthToken", response["X-Auth"]);
              dispatch("getGameInfo");
              commit("initGrids");
              vueInstance.$router.push("/place-ships");
              break;
            default:
              console.error("Join request status:" + request.status);
              console.error(response);
          }
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
        }
      });
      request.send();
    },
    fire({ state, commit }, { row, col }) {
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
          console.log(request.responseText);
          const response = JSON.parse(request.responseText);
          commit("addShot", response.shot);
        }
      });
      request.send("[" + (row + 1) + "," + (col + 1) + "]");
    },
    placeShip({ state, commit }, { newPosition, shipName, orientation }) {
      if (state.ships[shipName]) {
        console.debug("Remove old position");
        console.debug(state.ships[shipName]);
        for (let cpt = 0; cpt < state.ships[shipName].length; cpt++) {
          const [row, col] = state.ships[shipName][cpt];
          console.debug([row, col]);
          commit("setPlayerCell", { row: row, col: col, value: false });
        }
      }
      for (let cpt = 0; cpt < newPosition.length; cpt++) {
        const [row, col] = newPosition[cpt];
        commit("setPlayerCell", {
          row: row,
          col: col,
          value: shipName + "-" + cpt + "-" + orientation
        });
      }
      commit("setShipPosition", { shipName: shipName, position: newPosition });
    },
    sendShipsPositions({ state }) {
      const request = new XMLHttpRequest();
      request.open(
        "PATCH",
        "https://battleship-server-php.herokuapp.com/games/" +
          state.game.game_id +
          "/set-ships"
      );
      request.setRequestHeader("X-Auth", state.authToken);
      request.setRequestHeader("Content-Type", "application/json");
      request.addEventListener("readystatechange", () => {
        if (request.readyState == XMLHttpRequest.DONE) {
          switch (request.status) {
            case 200:
              console.debug("Correct ship placement");
              vueInstance.$router.push("/waiting");
              this.dispatch("runGame");
              break;
            default:
              console.error(request.status);
          }
          /* To do */
        }
      });
      request.send(JSON.stringify(state.ships));
    },
    getLastShot({ state, commit }) {
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
          const response = JSON.parse(request.responseText);
          console.debug(response);
          commit("addEnemyShot", response.last_shot.shot);
        }
      });
      request.send();
    },
    runGame({ state, dispatch, commit }) {
      dispatch("getGameInfo");
      let isPlayerTurn = state.game.status.turn === state.player;
      switch (state.game.status.status) {
        case "New":
          setTimeout(() => dispatch("runGame"), 500);
          break;
        case "InProgress":
          if (vueInstance.$router.currentRoute.path !== "/game") {
            vueInstance.$router.push("/game");
          }
          if (!state.allowFire && isPlayerTurn) {
            console.debug("Call getLastShot");
            dispatch("getLastShot");
          }
          if (state.allowFire !== isPlayerTurn)
            commit("setAllowFire", isPlayerTurn);
          setTimeout(() => dispatch("runGame"), 500);
          break;
        case "Finished":
          vueInstance.$router.push("/end-game");
      }
    }
  },
  modules: {}
});
