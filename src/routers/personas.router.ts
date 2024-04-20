import express from "express";
import {deletePersonas,getPersona, getPersonas,postPersona, putPersonas,getPersonaByQr} from "../controllers/personas.controller";
import createPersonaValidator from "../models/validators/personas.validator";
import { authIdentificador, authUsuario } from "../controllers/auth.controller";
const routerPersonas = express.Router();

// mostrar todos las personas
routerPersonas.get("/",authUsuario,getPersonas);
routerPersonas.get("/:id",authUsuario, getPersona);
routerPersonas.post("/",authUsuario, createPersonaValidator,postPersona);
routerPersonas.put("/:id",authUsuario, createPersonaValidator, putPersonas);
routerPersonas.delete("/:id",authUsuario, deletePersonas);
routerPersonas.get("/qr/:qr",authIdentificador, getPersonaByQr)


export default routerPersonas;