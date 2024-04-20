import express from "express";
import {getIdentificadores, getIdentificador,deletePersonaFromIdentificador} from "../controllers/identificadores.controller";
import {authUsuario} from "../controllers/auth.controller";
const routerIdentificadores = express.Router();

// mostrar el identificador de la persona
routerIdentificadores.get("/",authUsuario, getIdentificadores);
routerIdentificadores.get("/:id",authUsuario, getIdentificador);
routerIdentificadores.delete("/persona/:id",authUsuario, deletePersonaFromIdentificador);

export default routerIdentificadores;