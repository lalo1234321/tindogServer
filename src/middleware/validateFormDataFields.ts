import { Request, Response } from "express";
import { validationResult, Result, check, body } from "express-validator";

const displayErrors = (req: Request, res: Response, next) => {
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

const validateMediaFields = (req: Request, res: Response, next) => {
    if(Object.entries(req.files).length === 0) 
        return res.status(404).json({
            message: 'Upload the Profile Image & Medical Certificate Image'
        })
    next();
}

export { displayErrors, validateMediaFields };
