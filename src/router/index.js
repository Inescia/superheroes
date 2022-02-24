import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import List from "../views/List.vue";
import Informations from "../views/Informations.vue";
import New from "../views/New.vue";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Dashboard", //'Home',
    component: Dashboard, //Home
  },
  {
    path: "/Home",
    name: "Home", //'Home',
    component: Home, //Home
  },
  {
    path: "/List",
    name: "List",
    component: List,
  },
  {
    path: "/Informations",
    name: "Informations",
    component: Informations,
  },
  {
    path: "/New",
    name: "New",
    component: New,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
