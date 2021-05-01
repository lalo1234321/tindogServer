// next es un callback que le va a avisar a express que si todo sale bien, 

const { validationResult } = require("express-validator");

// que continue con el siguiente middleware
const validarCampos = (req, res, next) => {
    const errores = validationResult(req);
    // let dummy = errores.mapped().nombre;
    const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
        // Build your resulting errors however you want! String, object, whatever - it works!
        return `${msg}`;
      };
    const result = errores.formatWith(errorFormatter);
    
    // resultObject = result[0];
    // let msg = resultObject.msg;
    if( !errores.isEmpty() ) {
        return res.status(400).json({
            msg: result.array()[0]  
        });
    }
    next();
};

const validarEdad = (req, res, next) => {
    let age = req.body.age;
    if (age < 18 || age > 100) {
        return res.status(400).json({
            msg: 'Edad inválida, debe ser mayor a 18 años'
        });
    }
    next();
}
module.exports = {
    validarCampos,
    validarEdad
};