import express, { Express} from "express";
import {deletePersonas,getPersona, getPersonas,postPersona, putPersonas} from "../controllers/personas.controller";
import {validationResult} from 'express-validator'
import createPersonaValidator from "../models/validators/personas.validator";
const router = express.Router();



// mostrar todos las personas
router.get("/", getPersonas);
router.get("/:id", getPersona);
router.post("/", createPersonaValidator,postPersona);
router.put("/:id", createPersonaValidator, putPersonas);
router.delete("/:id", deletePersonas);


export default router;