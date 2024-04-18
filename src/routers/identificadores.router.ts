import express from "express";
import {getIdentificadores, getIdentificador,deletePersonaFromIdentificador} from "../controllers/identificadores.controller";
const routerIdentificadores = express.Router();

// mostrar el identificador de la persona
routerIdentificadores.get("/", getIdentificadores);
routerIdentificadores.get("/:id", getIdentificador);
routerIdentificadores.delete("/persona/:id", deletePersonaFromIdentificador);
export default routerIdentificadores;