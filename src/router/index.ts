import { createRouter, createWebHashHistory } from "vue-router";
import "nprogress/nprogress.css";
import { staticRoutes, notFoundAndNoPower, dynamicRoutes } from "/@/router/routerList";

export const routerList = [...staticRoutes, ...dynamicRoutes, ...notFoundAndNoPower];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: routerList,
});
router.beforeEach(async (to, from, next) => {
  next();
});

export default router;
