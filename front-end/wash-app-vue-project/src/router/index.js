import {createRouter, createWebHistory} from "vue-router";
import MainView from "../views/MainView.vue";
import HomeView from "../views/HomeView.vue";
import store from "../store";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: MainView,
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: "",
          name: "home",
          component: HomeView,
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "activity",
          name: "activity",
          component: () => import("../views/ActivityView.vue"),
          meta: {
            requiresAuth: true,
          },
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue")
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/RegisterView.vue")
    },
  ],
});

router.beforeEach((to, from, next) => {

  let currentUser = {
    id: -1
  }

  if (to.matched.some((route) => route.meta.requiresAuth)) {

    currentUser = JSON.parse(localStorage.getItem("store"));
    console.log(currentUser)

    if (store.state.currentUser.id === -1) {
      console.log("El usuario no existe");
      next('/login');
    } else {
      console.log("El usuario si existe");
      next()
    }
  } else {
    next()
  }

});

export default router;
