import {body} from 'express-validator'

export const createPersonaValidator = [
    body('nombres', 'El campo nombres no puede estar vacío').not().isEmpty(),
    body('apellidos', 'El campo apellidos no puede estar vacío').not().isEmpty(),
    body('residencia', 'El campo residencia no puede estar vacío').not().isEmpty(),
    body('correo', 'Correo invalido').not().isEmpty().isEmail(),
    body('ci', 'El campo ci no puede estar vacío').not().isEmpty().isNumeric(),
    body('plan', 'El campo plan no puede estar vacío').not().isEmpty(),
    body('celular', 'El campo celular solo debe contener numeros').not().isEmpty().isNumeric(),
]

export default createPersonaValidator;