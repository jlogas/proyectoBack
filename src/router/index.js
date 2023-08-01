import { Router } from "express";
import rutas from "./products.routes.js";
import rutasCarritos from "./car.routes.js";
import routerSessions from "./sessions.router.js";

const mainRouter= Router()


mainRouter.use("/productos", rutas);
mainRouter.use("/carrito", rutasCarritos)
mainRouter.use("/sessions",routerSessions)

export default mainRouter 