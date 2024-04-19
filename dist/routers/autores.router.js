"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const autores_controller_1 = require("../controllers/autores.controller");
const routerAutores = express_1.default.Router();
routerAutores.get("/", autores_controller_1.getAutores);
routerAutores.get("/:id", autores_controller_1.getAutor);
exports.default = routerAutores;
//# sourceMappingURL=autores.router.js.map