import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import DestinationsView from "../views/DestinationsView.vue";
import CreateDestination from "../views/CreateDestination.vue";
import DestinationDetails from "../views/DestinationDetails.vue";
import NotFoundView from "../views/NotFoundView.vue";
import Logout from "../views/Logout.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: LoginView,
    },
    {
      path: "/my-destinations",
      name: "destinations",
      component: DestinationsView,
    },
    {
      path: "/create-destination",
      name: "create-destination",
      component: CreateDestination,
    },
    { path: "/logout", name: "logout", component: Logout },
    { path: "/:catchAll(.*)", name: "NotFound", component: NotFoundView },
    {
      path: "/my-destinations/:id",
      name: "destination-details",
      component: DestinationDetails,
      props: (route) => {
        const destination = route.query.data
          ? JSON.parse(route.query.data.toString())
          : null;

        return { destination };
      },
    },
  ],
});

export default router;
