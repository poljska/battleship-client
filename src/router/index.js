import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import JoinGame from "@/views/JoinGame.vue";
import Game from "@/views/Game.vue";
import PlaceShips from "@/views/PlaceShips.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/join",
    name: "Join Game",
    component: JoinGame
  },
  {
    path: "/game",
    name: "Game",
    component: Game
  },
  {
    path: "/place-ships",
    name: "Place ships",
    component: PlaceShips
  }
];

const router = new VueRouter({
  routes
});

export default router;
