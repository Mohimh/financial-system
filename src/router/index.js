import { createRouter, createWebHashHistory } from "vue-router";
import Login from "./login";
import SelfInformation from "./selfInformation";
import Modules from "./modules";

const router = createRouter(
  {
    history: createWebHashHistory(),
    routes: [Modules, Login, SelfInformation],
  }
)

export default router