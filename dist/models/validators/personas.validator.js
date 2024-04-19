"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPersonaValidator = void 0;
const express_validator_1 = require("express-validator");
exports.createPersonaValidator = [
    (0, express_validator_1.body)('nombres', 'El campo nombres no puede estar vacío').not().isEmpty(),
    // body('apellidos', 'El campo apellidos no puede estar vacío').not().isEmpty(),
    (0, express_validator_1.body)('residencia', 'El campo residencia no puede estar vacío').not().isEmpty(),
    (0, express_validator_1.body)('correo', 'Correo invalido').not().isEmpty().isEmail(),
    (0, express_validator_1.body)('ci', 'El campo ci no puede estar vacío').not().isEmpty().isNumeric(),
    (0, express_validator_1.body)('plan', 'El campo plan no puede estar vacío').not().isEmpty(),
    (0, express_validator_1.body)('celular', 'El campo celular solo debe contener numeros').not().isEmpty(),
];
exports.default = exports.createPersonaValidator;
//# sourceMappingURL=personas.validator.js.map