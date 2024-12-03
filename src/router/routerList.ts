import { RouteRecordRaw } from "vue-router";

/***
 * 主要的路由数组，在这个地方定义的路由页面相当于是受layout控制
 *
 */
export const dynamicRoutes: Array<RouteRecordRaw> = [
  // {
  //   path: "/",
  //   name: "login",
  //   component: () => import("/@/views/login/login-account.vue"),
  // },
  {
    path: "/",
    name: "home",
    component: () => import("/@/views/home/home-view.vue"),
  },
];

/**
 * 定义静态路由（默认路由）
 */
export const staticRoutes: Array<RouteRecordRaw> = [];
/**
 * 定义错误路由
 */
export const notFoundAndNoPower = [
  {
    path: "/:path(.*)*",
    name: "notFound",
    component: () => import("/@/views/error/error-404.vue"),
  },
  {
    path: "/500",
    name: "error500",
    component: () => import("/@/views/error/error-500.vue"),
  },
];
