"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const routerAuth = express_1.default.Router();
routerAuth.post("/login", auth_controller_1.postLoginUsuario);
routerAuth.post("/identificadores/login", auth_controller_1.postLoginIdentificador);
exports.default = routerAuth;
//# sourceMappingURL=auth.router.js.map