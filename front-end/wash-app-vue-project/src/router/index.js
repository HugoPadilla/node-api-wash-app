import { createRouter, createWebHistory } from "vue-router";
import MainView from "../views/MainView.vue";
import HomeView from "../views/HomeView.vue";
import Cookies from "js-cookie";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            component: MainView,
            meta: {
                requiereAuth: true,
            },
            children: [
                {
                    path: "",
                    name: "home",
                    component: HomeView,
                    meta: {
                        requiereAuth: true,
                    },
                },
                {
                    path: "activity",
                    name: "activity",
                    component: () => import("../views/ActivityView.vue"),
                    meta: {
                        requiereAuth: true,
                    },
                },
            ],
        },
        {
            path: "/login",
            name: "login",
            component: () => import("../views/LoginView.vue"),
            meta: {
                requiereAuth: false,
            },
        },
        {
            path: "/register",
            name: "register",
            component: () => import("../views/RegisterView.vue"),
            meta: {
                requiereAuth: false,
            },
        },
    ],
});

router.beforeEach((to, from, next) => {
    let userCookie = {};

    console.log("Informacion de to")
    console.log(to);

    if (to.matched.some((record) => record.meta.requiereAuth)) {
        try {
            const cookie = Cookies.get("usuario") ? Cookies.get("usuario") : "";
            userCookie = JSON.parse(cookie);
        } catch (error) {}

        console.log("La ruta necesita autenticacion");
        if (userCookie.id != null) {
            console.log("El usuario existe");
            next();
        } else {
            console.log("Navegar al la ruta login");
            router.push({ name: "login" });
        }
    } else {


        if(userCookie !== null ){
            console.log("usuario exites en no autentication");
            console.log(userCookie);
        } else {
            console.log(userCookie);
        }

       
          next()
        
    }
});

export default router;
