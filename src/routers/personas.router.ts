import express from "express";
import {deletePersonas,getPersona, getPersonas,postPersona, putPersonas} from "../controllers/personas.controller";
import createPersonaValidator from "../models/validators/personas.validator";
const routerPersonas = express.Router();

// mostrar todos las personas
routerPersonas.get("/", getPersonas);
routerPersonas.get("/:id", getPersona);
routerPersonas.post("/", createPersonaValidator,postPersona);
routerPersonas.put("/:id", createPersonaValidator, putPersonas);
routerPersonas.delete("/:id", deletePersonas);

export default routerPersonas;