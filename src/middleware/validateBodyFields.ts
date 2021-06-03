import { check, body } from "express-validator";
import { Request, Response } from "express";
import { validationResult, Result } from "express-validator";
import { ageValidator } from "./customChecks/customUserChecks";

export const displayErrors = (req: Request, res: Response, next) => {
    let errors: Result = validationResult(req); 
    const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
        let paramStr: string = param;
        // Build your resulting errors however you want! String, object, whatever - it works!
        return `${msg} for ${paramStr.toUpperCase()}`;
      };
    errors = errors.formatWith(errorFormatter);//'errors' has all the recovered validation errors through the sequential validation process 
    
    if( !errors.isEmpty() )
        return res.status(404).json({ 
            message: errors.array()[0],
        });
   
    next();
};

const validateCredentials = [
    check('email', 'El correo electrónico es obligatorio').notEmpty(),
    displayErrors,
    check('password', 'La contraseña es obligatoria').notEmpty(),
    displayErrors,
    check('email', 'Email no válido').isEmail(),
    displayErrors,
]
const validatePetBodyFields = [
    body('username').not().isEmpty(),
    body('name').not().isEmpty(),
    displayErrors,
    body('age').not().isEmpty(),
    displayErrors,
    body('specie').not().isEmpty(),
    displayErrors,
    body('breed').not().isEmpty(),
    displayErrors,
    body('vaccines').not().isEmpty(),
    displayErrors,
]
const validateUserBodyFields = [
    check('firstName', 'El nombre es obligatorio').notEmpty(),
    displayErrors,
    check('lastName', 'El apellido es obligatorio').notEmpty(),
    displayErrors,
    check('userName', 'El nombre de usuario es obligatorio').notEmpty(),
    displayErrors,
    check('age', 'La edad es obligatoria').notEmpty(),
    displayErrors,
    check('state', 'El estado es obligatorio').notEmpty(),
    displayErrors,
    check('town', 'La ciudad es obligatoria').notEmpty(),
    displayErrors,
    check('email', 'El correo electrónico es obligatorio').notEmpty(),
    displayErrors,
    check('password', 'La contraseña es obligatoria').notEmpty(),
    displayErrors,
    check('email', 'Email no válido').isEmail(),
    displayErrors,
    ageValidator
]

export {
    validateCredentials,
    validatePetBodyFields,
    validateUserBodyFields
}