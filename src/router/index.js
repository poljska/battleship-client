import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import JoinGame from "@/views/JoinGame.vue";

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
  }
];

const router = new VueRouter({
  routes
});

export default router;
