const jwt = require('jsonwebtoken');
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
        console.log('dentro del try');
        const { uid } = jwt.verify( token, process.env.JWT_KEY );
        console.log('antes del req ',uid);
        req.userId = uid;
        console.log(req.userId);
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