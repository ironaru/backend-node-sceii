"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const identificadores_controller_1 = require("../controllers/identificadores.controller");
const auth_controller_1 = require("../controllers/auth.controller");
const routerIdentificadores = express_1.default.Router();
// mostrar el identificador de la persona
routerIdentificadores.get("/", auth_controller_1.authUsuario, identificadores_controller_1.getIdentificadores);
routerIdentificadores.get("/:id", auth_controller_1.authUsuario, identificadores_controller_1.getIdentificador);
routerIdentificadores.delete("/persona/:id", auth_controller_1.authUsuario, identificadores_controller_1.deletePersonaFromIdentificador);
exports.default = routerIdentificadores;
//# sourceMappingURL=identificadores.router.js.map