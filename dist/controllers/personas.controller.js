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
exports.getPersonaByQr = exports.deletePersonas = exports.putPersonas = exports.postPersona = exports.getPersona = exports.getPersonas = void 0;
const personas_1 = __importDefault(require("../models/personas"));
const identificadores_1 = __importDefault(require("../models/identificadores"));
const { Op } = require("sequelize");
// obtener todos las personas
const getPersonas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var personas = [];
        yield personas_1.default.findAll({
            where: {
                deletedAt: {
                    [Op.is]: null,
                },
            },
        }).then((list) => {
            personas = list;
        });
        return res.json(personas);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.getPersonas = getPersonas;
//obtener una persona
const getPersona = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var id = req.params.id;
        var persona;
        persona = (yield personas_1.default.findOne({ where: { id: id } }));
        if (persona == undefined || persona == null) {
            return res.status(404).json({ message: 'Persona no encontrada' });
        }
        return res.json(persona);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.getPersona = getPersona;
// post personas
const postPersona = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // let personaDTO: PersonasDTO = req.body as PersonasDTO;
        let persona = req.body;
        // let identificador:Identificadores = getDatosIdentificador(personaDTO);
        // const errors = validationResult(req)
        // if (!errors.isEmpty()) {
        //   return res.status(422).json({errors: errors.array()})
        // }
        let identificador = yield identificadores_1.default.findOne({
            where: {
                persona_id: {
                    [Op.is]: null
                }
            }, order: [['id', 'ASC']]
        });
        if (persona.nombres == null) {
            persona.nombres = "";
        }
        if (persona.apellidos == null) {
            persona.apellidos = "";
        }
        persona.encuestado = false;
        persona.nombres.toLowerCase();
        persona.apellidos.toLowerCase();
        if (identificador == null || identificador == undefined) {
            return res.status(500).json({ message: 'Identificadores no disponibles' });
        }
        yield personas_1.default.create(persona);
        // let identificadorCreated =  await Identificadores.create(identificador,{include:[Personas]});
        // identificadorCreated.persona_id = persona.id
        // identificadorCreated.save();
        return res.status(200).json(persona);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.postPersona = postPersona;
// put personas
const putPersonas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var persona = req.body;
    var id = req.params.id;
    try {
        yield personas_1.default.update(persona, {
            where: {
                id: id
            }
        });
        if (persona == undefined || persona == null) {
            return res.status(404).json({ message: 'Persona no encontrada' });
        }
        persona = (yield personas_1.default.findOne({ where: { id: id } }));
        return res.json(persona);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.putPersonas = putPersonas;
// delete personas
const deletePersonas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var id = req.params.id;
    try {
        yield personas_1.default.findByPk(id);
        return res.json(personas_1.default.destroy({ where: { id: id } }));
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.deletePersonas = deletePersonas;
//Get persona by codigo_qr
const getPersonaByQr = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var qr = req.params.qr;
    console.log(qr);
    try {
        let identificador = yield identificadores_1.default.findOne({ where: { codigo_qr: qr } });
        if (identificador == null || identificador == undefined) {
            return res.status(404).json({ message: "Identificador QR no encontrado" });
        }
        if (identificador.persona_id == null || identificador.persona_id == undefined) {
            return res.status(404).json({ message: "Identificador QR no asociado" });
        }
        let persona = yield personas_1.default.findOne({ where: { id: identificador.persona_id } });
        return res.json(persona);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.getPersonaByQr = getPersonaByQr;
//# sourceMappingURL=personas.controller.js.map