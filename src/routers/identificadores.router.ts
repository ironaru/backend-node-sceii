import express from "express";
import {getIdentificadores, getIdentificador} from "../controllers/identificadores.controller";
const routerIdentificadores = express.Router();

// mostrar el identificador de la persona
routerIdentificadores.get("/", getIdentificadores);
routerIdentificadores.get("/:id", getIdentificador);

export default routerIdentificadores;