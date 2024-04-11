const express = require("express");
const router = express.Router();
const personasController = require("../controllers/personas.controller");
const {getPersonas } = personasController;

// mostrar todos las personas
router.get("/", getPersonas);
 
module.exports = router;