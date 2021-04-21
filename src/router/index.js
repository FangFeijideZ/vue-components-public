import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: resolve => require(["../components/HelloWorld.vue"], resolve), // 路由懒加载
  },
  {
    path: "/public_index",
    name: "public_index",
    component: resolve => require(["../components/public_index.vue"], resolve), // 路由懒加载
  },
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
});

export default router;
