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
exports.deletePersonaFromIdentificador = exports.getIdentificador = exports.getIdentificadores = void 0;
const identificadores_1 = __importDefault(require("../models/identificadores"));
const personas_1 = __importDefault(require("../models/personas"));
const { Op } = require("sequelize");
const getIdentificadores = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var identificadores = [];
        yield identificadores_1.default.findAll({
            where: {
                persona_id: {
                    [Op.not]: null,
                }
            },
            include: {
                model: personas_1.default,
            },
            order: [['id', 'ASC']]
        }).then((list) => {
            identificadores = list;
        });
        return res.status(200).json(identificadores);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.getIdentificadores = getIdentificadores;
const getIdentificador = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var id = req.params.id;
        var identificador = yield identificadores_1.default.findOne({ where: { id: id }, include: personas_1.default });
        if (identificador == undefined || identificador == null) {
            return res.status(404).json({ message: 'Identificador no encontrado' });
        }
        return res.json(identificador);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.getIdentificador = getIdentificador;
const deletePersonaFromIdentificador = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        let identificador = yield identificadores_1.default.findOne({ where: { id: id }, include: personas_1.default });
        const i = Object.assign({}, identificador);
        identificador.persona_id = null;
        identificador.save();
        yield personas_1.default.destroy({ where: { id: i.persona_id }, force: true });
        return res.status(200).json();
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.deletePersonaFromIdentificador = deletePersonaFromIdentificador;
//# sourceMappingURL=identificadores.controller.js.map