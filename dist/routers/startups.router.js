"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const startups_controller_1 = require("../controllers/startups.controller");
const auth_controller_1 = require("../controllers/auth.controller");
const routerStartups = express_1.default.Router();
routerStartups.get('/', auth_controller_1.authIdentificador, startups_controller_1.getStartups);
routerStartups.post('/persona/:id', auth_controller_1.authIdentificador, startups_controller_1.postStartupsEncuesta);
routerStartups.get('/resultados', auth_controller_1.authUsuario, startups_controller_1.getResultadosStartups);
exports.default = routerStartups;
//# sourceMappingURL=startups.router.js.map