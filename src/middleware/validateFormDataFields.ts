import { Request, Response } from "express";
import { validationResult, Result, check, body } from "express-validator";

// que continue con el siguiente middleware
const displayErrors = (req: Request, res: Response, next) => {
    let errors: Result = validationResult(req);
    // let dummy = errores.mapped().nombre;
    const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
        let paramStr: string = param;
        // Build your resulting errors however you want! String, object, whatever - it works!
        return `${msg} for ${paramStr.toUpperCase()}`;
      };
    errors = errors.formatWith(errorFormatter);//errors has all the recovered validation errors through the sequential validation process 
    
    if( !errors.isEmpty() )
        return res.status(400).json({
            ok: false,
            msg: errors.array()[0]  
        });
   
    next();
};

export { displayErrors };
