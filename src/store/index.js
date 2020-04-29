import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    authToken: "",
    player: ""
  },
  mutations: {
    setAuthToken(state, authToken) {
      state.authToken = authToken;
    },
    setPlayer(state, player) {
      state.player = player;
    }
  },
  actions: {
    createNewGame() {
      let request = new XMLHttpRequest();
      request.open("POST", "https://battleship-server-php.herokuapp.com/games");
      request.addEventListener("readystatechange", () => {
        if (
          request.readyState == XMLHttpRequest.DONE &&
          request.status == 201
        ) {
          const response = JSON.parse(request.responseText);
          this.dispatch("joinGame", response["game_id"]);
        }
      });
      request.send(null);
    },
    joinGame({ commit }, game_id) {
      let request = new XMLHttpRequest();
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
        }
      });
      request.send();
    }
  },
  modules: {}
});
