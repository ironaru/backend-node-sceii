"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const personas_controller_1 = require("../controllers/personas.controller");
const personas_validator_1 = __importDefault(require("../models/validators/personas.validator"));
const auth_controller_1 = require("../controllers/auth.controller");
const routerPersonas = express_1.default.Router();
// mostrar todos las personas
routerPersonas.get("/", auth_controller_1.authUsuario, personas_controller_1.getPersonas);
routerPersonas.get("/:id", auth_controller_1.authUsuario, personas_controller_1.getPersona);
routerPersonas.post("/", auth_controller_1.authUsuario, personas_validator_1.default, personas_controller_1.postPersona);
routerPersonas.put("/:id", auth_controller_1.authUsuario, personas_validator_1.default, personas_controller_1.putPersonas);
routerPersonas.delete("/:id", auth_controller_1.authUsuario, personas_controller_1.deletePersonas);
routerPersonas.get("/qr/:qr", auth_controller_1.authIdentificador, personas_controller_1.getPersonaByQr);
exports.default = routerPersonas;
//# sourceMappingURL=personas.router.js.map