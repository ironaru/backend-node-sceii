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
exports.getResultadosStartups = exports.postStartupsEncuesta = exports.getStartups = void 0;
const startups_1 = __importDefault(require("../models/startups"));
const personas_1 = __importDefault(require("../models/personas"));
const getStartups = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let startups = [];
        yield startups_1.default.findAll().then((t) => {
            startups = t;
        });
        res.status(200).json(startups);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.getStartups = getStartups;
const postStartupsEncuesta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        let persona = yield personas_1.default.findOne({ where: { id: id } });
        if (persona == null || persona === undefined) {
            return res.status(404).json({ message: 'Persona no encontrada' });
        }
        const startups = req.body;
        if (persona.encuestado == true) {
            return res.status(201).json({ message: 'Persona encuestada' });
        }
        else {
            persona.encuestado = true;
            persona.setStartups(startups.map(startup => {
                return startup.id;
            }));
            yield persona.save();
            return res.status(200).json();
        }
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.postStartupsEncuesta = postStartupsEncuesta;
const getResultadosStartups = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let resultados = [];
        let startups = [];
        yield startups_1.default.findAll({ include: [personas_1.default] }).then((list) => {
            startups = list;
        });
        startups.forEach((startup) => __awaiter(void 0, void 0, void 0, function* () {
            startup.Personas = startup.Personas;
            if (startup.Personas == undefined) {
                startup.Personas = [];
            }
            const startupResult = { id: startup.id, nombre: startup.nombre, votos: startup.Personas.length };
            resultados.push(startupResult);
        }));
        return res.status(200).json(resultados);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.getResultadosStartups = getResultadosStartups;
//# sourceMappingURL=startups.controller.js.map