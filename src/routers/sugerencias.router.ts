import express from "express";
import { getSugerencias, postSugerencias } from "../controllers/sugerencias.controller";

const routerSugerencias = express.Router();
routerSugerencias.get('/',getSugerencias);
routerSugerencias.post('/persona/:id',postSugerencias);

export default routerSugerencias; 