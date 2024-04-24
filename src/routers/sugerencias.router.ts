import express from "express";
import { getSugerencias, postSugerencias } from "../controllers/sugerencias.controller";
import { authIdentificador, authUsuario } from "../controllers/auth.controller";

const routerSugerencias = express.Router();
routerSugerencias.get('/',authUsuario,getSugerencias);
routerSugerencias.post('/persona/:id',authIdentificador ,postSugerencias);

export default routerSugerencias; 