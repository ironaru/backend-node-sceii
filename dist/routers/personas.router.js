"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const personas_controller_1 = require("../controllers/personas.controller");
const personas_validator_1 = __importDefault(require("../models/validators/personas.validator"));
const routerPersonas = express_1.default.Router();
// mostrar todos las personas
routerPersonas.get("/", personas_controller_1.getPersonas);
routerPersonas.get("/:id", personas_controller_1.getPersona);
routerPersonas.post("/", personas_validator_1.default, personas_controller_1.postPersona);
routerPersonas.put("/:id", personas_validator_1.default, personas_controller_1.putPersonas);
routerPersonas.delete("/:id", personas_controller_1.deletePersonas);
routerPersonas.get("/qr/:qr", personas_controller_1.getPersonaByQr);
exports.default = routerPersonas;
//# sourceMappingURL=personas.router.js.map