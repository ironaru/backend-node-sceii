"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./db/database");
const personas_router_1 = __importDefault(require("./routers/personas.router"));
const identificadores_router_1 = __importDefault(require("./routers/identificadores.router"));
const startups_router_1 = __importDefault(require("./routers/startups.router"));
const autores_router_1 = __importDefault(require("./routers/autores.router"));
const auth_router_1 = __importDefault(require("./routers/auth.router"));
const cors = require('cors');
require('dotenv').config();
const app = (0, express_1.default)();
const port = Number(process.env.PORT) || 3000;
const password = process.env.PASSWORD;
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cors({
    origin: '*',
    preflightContinue: true
}));
// Routers
app.use("/api/personas", personas_router_1.default);
app.use("/api/identificadores", identificadores_router_1.default);
app.use("/api/startups", startups_router_1.default);
app.use("/api/autores", autores_router_1.default);
app.use("/api/auth", auth_router_1.default);
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield database_1.sequelize.sync({ force: false });
            console.log("Conexión establecida con la base de datos");
            app.listen(port, () => console.log("Escuchando en el puerto " + port));
        }
        catch (error) {
            console.error("Error al conectar con la base de datos", error);
        }
    });
}
main();
//# sourceMappingURL=index.js.map