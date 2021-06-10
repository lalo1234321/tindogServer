import * as jwt from 'jsonwebtoken';
import { NextFunction, Request, Response }  from 'express';

const validateJWT = ( req:Request, res:Response, next:NextFunction ) => {
    const token = req.header('token');
    if( !token ) {
        return res.status(401).json({
            message: 'There is no token in the request'
        });
    }

    try{
        const decodedToken = Object(jwt.verify( token, process.env.JWT_KEY ));
        req.userId = decodedToken.uid;
        next();
    } catch(err) {
        return res.status(401).json({
            message: 'No valid token'
        });
    } 
}

export {
    validateJWT
}


