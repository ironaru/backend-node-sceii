import express from "express";
import { getSugerencias, postSugerencias } from "../controllers/sugerencias.controller";
import { authIdentificador } from "../controllers/auth.controller";

const routerSugerencias = express.Router();
routerSugerencias.get('/',getSugerencias);
routerSugerencias.post('/persona/:id',authIdentificador ,postSugerencias);

export default routerSugerencias; 