import Vue from "vue";
import VueRouter from "vue-router";

import Login from "../views/Login.vue";
import Home from "../views/Home.vue";
import AdminPage from "../views/AdminPage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    name: "Redirect Login",
    component: Login
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/home/:isAdmin",
    name: "Home",
    component: Home
  },
  {
    path: "/adminPage",
    name: "Reports",
    component: AdminPage
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
