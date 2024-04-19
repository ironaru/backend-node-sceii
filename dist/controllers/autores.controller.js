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
exports.getAutor = exports.getAutores = void 0;
const { Op } = require("sequelize");
const autores_1 = __importDefault(require("../models/autores"));
const getAutores = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let autores = [];
        yield autores_1.default.findAll().then((list) => {
            autores = list;
        });
        return res.json(autores);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.getAutores = getAutores;
const getAutor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var id = req.params.id;
        var autor = yield autores_1.default.findOne({ where: { id: id } });
        if (autor == undefined || autor == null) {
            return res.status(404).json({ message: 'Autor no encontrado' });
        }
        return res.json(autor);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.getAutor = getAutor;
//# sourceMappingURL=autores.controller.js.map