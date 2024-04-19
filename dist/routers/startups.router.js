"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const startups_controller_1 = require("../controllers/startups.controller");
const routerStartups = express_1.default.Router();
routerStartups.get('/', startups_controller_1.getStartups);
routerStartups.post('/persona/:id', startups_controller_1.postStartupsEncuesta);
routerStartups.get('/resultados', startups_controller_1.getResultadosStartups);
exports.default = routerStartups;
//# sourceMappingURL=startups.router.js.map