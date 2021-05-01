const jwt = require('jsonwebtoken');

const generarJWT = ( uid ) => {
    
    return new Promise( (resolve, reject) => {
        const payload = {
            uid
        };
        console.log('entró a la generación');
        jwt.sign( payload, process.env.JWT_KEY, {
            expiresIn: '48h'
        }, (err, token) => {
            console.log(token);
            if(err) {
                // no se pudo crear el token
                reject('No se pudo generar el JWT');
            } else {
                // se genera token
                // al resolver el token se retornará esta información
                resolve(token);
            }
        });
    });
};

// método para verificar jwt en el socketServer
const comprobarJWT = ( token = '' ) => {
    try{
        const { uid } = jwt.verify( token, process.env.JWT_KEY );
        return [true, uid];
    } catch(err) {
        return [false, null];
    } 
};

module.exports = {
    generarJWT,
    comprobarJWT
}