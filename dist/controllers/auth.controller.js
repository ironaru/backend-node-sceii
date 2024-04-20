"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.postLoginIdentificador = exports.postLoginUsuario = exports.authUsuario = exports.authIdentificador = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const identificadores_1 = __importDefault(require("../models/identificadores"));
const personas_1 = __importDefault(require("../models/personas"));
const bcrypt = __importStar(require("bcrypt"));
require('dotenv').config();
const private_key = process.env.JWT_KEY;
const username = process.env.USER;
const passwordHashed = process.env.PASSWORD;
const authIdentificador = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
        if (!token) {
            throw new Error();
        }
        const i = jsonwebtoken_1.default.verify(token, private_key);
        var identificador = yield identificadores_1.default.findOne({ where: { codigo_qr: i.codigo_qr }, include: personas_1.default });
        if (identificador == undefined || identificador == null) {
            throw new Error();
        }
        if (identificador.persona_id == undefined || identificador.persona_id == null) {
            throw new Error();
        }
        next();
    }
    catch (err) {
        res.status(401).json({ message: 'Identificador no permitido' });
    }
});
exports.authIdentificador = authIdentificador;
const authUsuario = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const token = (_b = req.header('Authorization')) === null || _b === void 0 ? void 0 : _b.replace('Bearer ', '');
        if (!token) {
            throw new Error();
        }
        const i = jsonwebtoken_1.default.decode(token);
        if (i.username != username) {
            throw new Error();
        }
        const isMatch = yield bcrypt.compare(i.password, passwordHashed);
        if (isMatch === false) {
            throw new Error();
        }
        const current_time = Math.floor(Date.now() / 1000);
        if (i.exp - current_time > 0) {
            next();
        }
        else {
            throw new Error();
        }
    }
    catch (err) {
        res.status(401).json({ message: 'No autorizado' });
    }
});
exports.authUsuario = authUsuario;
const postLoginUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        console.log(user);
        if (user.username != username) {
            return res.status(403).json({ message: 'Usuario o contraseña incorrecto' });
        }
        const isMatch = yield bcrypt.compare(user.password, passwordHashed);
        console.log(isMatch);
        if (isMatch === false) {
            return res.status(403).json({ message: 'Usuario o contraseña incorrecto' });
        }
        const current_time = Math.floor(Date.now() / 1000);
        const expiration_time = current_time + 864000;
        const token = jsonwebtoken_1.default.sign(JSON.parse(JSON.stringify(user)), private_key, { algorithm: 'HS256', expiresIn: expiration_time });
        return res.status(200).json(token);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.postLoginUsuario = postLoginUsuario;
const postLoginIdentificador = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const i = req.body;
        const identificador = yield identificadores_1.default.findOne({ where: { codigo_qr: i.codigo_qr }, include: personas_1.default });
        if (identificador == undefined || identificador == null) {
            return res.status(403).json({ message: 'Identificador no permitido' });
        }
        if (identificador.persona_id == undefined || identificador.persona_id == null) {
            return res.status(403).json({ message: 'Identificador no permitido' });
        }
        const current_time = Math.floor(Date.now() / 1000);
        const expiration_time = current_time + 864000;
        const token = jsonwebtoken_1.default.sign(JSON.parse(JSON.stringify(identificador)), private_key, { algorithm: 'HS256', expiresIn: expiration_time });
        return res.status(200).json(token);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.postLoginIdentificador = postLoginIdentificador;
//# sourceMappingURL=auth.controller.js.map