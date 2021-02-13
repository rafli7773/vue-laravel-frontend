import Vue from "vue";
import VueRouter from "vue-router";
import Posts from "../views/Posts.vue";
import axios from "axios";

axios.defaults.withCredentials = true;

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Posts",
    component: Posts,
  },
  {
    path: "/posts",
    component: Posts,
  },
  {
    path: "/posts/:postSlug/show",
    name: "DetailPost",
    component: () => import("../views/posts/Detail.vue"),
  },
  {
    path: "/posts/:postSlug/edit",
    name: "EditPost",
    component: () => import("../views/posts/Edit.vue"),
  },
  {
    path: "/join",
    name: "JoinPost",
    component: () => import("../views/posts/Join.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/auth/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/auth/Register.vue"),
  },
  {
    path: "/posts/create",
    name: "CreatePost",
    component: () => import("../views/posts/Create.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
