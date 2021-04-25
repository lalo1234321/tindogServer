import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response }  from 'express';



const validarJWT = ( req:Request, res:Response, next:NextFunction ) => {
    // leer el token
    const token = req.header('token');

    if( !token ) {
        // 401 unAuthorized
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }

    try{
        const { uid } = jwt.verify( token, process.env.JWT_KEY );
        req.userId = uid;

        next();
    } catch(err) {
        return res.status(401).json({
            ok: false,
            msg: 'token no válido'
        });
    } 

    
};

module.exports = {
    validarJWT
}