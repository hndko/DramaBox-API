import { createRouter, createWebHistory } from "vue-router";

// Lazy load pages for better performance
const HomePage = () => import("../pages/HomePage.vue");
const DubIndoPage = () => import("../pages/DubIndoPage.vue");
const ForYouPage = () => import("../pages/ForYouPage.vue");
const SearchPage = () => import("../pages/SearchPage.vue");
const DetailPage = () => import("../pages/DetailPage.vue");
const WatchPage = () => import("../pages/WatchPage.vue");

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
    meta: { title: "For You" },
  },
  {
    path: "/foryou",
    name: "ForYou",
    component: ForYouPage,
    meta: { title: "For You Video", hideNav: true },
  },
  {
    path: "/dubindo",
    name: "DubIndo",
    component: DubIndoPage,
    meta: { title: "Dub Indo" },
  },
  {
    path: "/search",
    name: "Search",
    component: SearchPage,
    meta: { title: "Cari Drama" },
  },
  {
    path: "/drama/:id",
    name: "Detail",
    component: DetailPage,
    meta: { title: "Detail Drama" },
  },
  {
    path: "/watch/:id/:episode?",
    name: "Watch",
    component: WatchPage,
    meta: { title: "Tonton", hideNav: true },
  },
  // Redirect unknown routes to home
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

// Update page title on route change
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title || "DramaBox"} - DramaBox`;
  next();
});

export default router;
