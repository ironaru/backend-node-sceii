import express from "express";
import { postLoginUsuario,postLoginIdentificador } from "../controllers/auth.controller";

const routerAuth = express.Router();
routerAuth.post("/",postLoginUsuario);
routerAuth.post("/identificador",postLoginIdentificador);

export default routerAuth;