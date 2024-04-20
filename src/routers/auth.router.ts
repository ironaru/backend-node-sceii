import express from "express";
import { postLoginUsuario,postLoginIdentificador } from "../controllers/auth.controller";

const routerAuth = express.Router();
routerAuth.post("/login",postLoginUsuario);
routerAuth.post("/identificadores/login",postLoginIdentificador);

export default routerAuth;