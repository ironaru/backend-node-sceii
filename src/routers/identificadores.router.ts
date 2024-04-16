import express from "express";
import {getIdentificador} from "../controllers/identificadores.controller";
const routerIdentificadores = express.Router();

// mostrar el identificador de la persona
routerIdentificadores.get("/", getIdentificador);

export default routerIdentificadores;