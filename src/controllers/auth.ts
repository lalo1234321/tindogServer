import { Request, Response } from 'express';
import User from '../mongoose-models/userModel'; 
import * as bcrypt from 'bcrypt';
import { IUser } from "../interfaces/IUser";
const { generarJWT } = require('../utils/jwt');

const login = async(req: Request, res: Response) => {
    let passwordBody = req.body.password;
    console.log("se está ejecutando");
    // para obtener el valor de un query si es que no implementamos una interfaz en nuestros modelos
    //  de mongodb
    // let password2 = query.get('password');
    
    try {
        const user:IUser = await User.findOne({email: req.body.email});
        if( !user ) {
            return res.status(400).json({
                message:"Usuario no encontrado"
            });
        }
        if (!user.emailConfirmed) {
            return res.status(400).json({
                message: "Correo no confirmado"
            });
        }
        const validPassword = await bcrypt.compare(passwordBody, user.password);
        if( !validPassword ) {
            return res.status(400).json({
                message:'Las credenciales no coinciden'
            });
        }
        const token = await generarJWT( user._id );
        res.status(200).json({
            user,
            token
        });

    } catch( err ) {
        return res.status(500).json({
            message:'Ocurrió un error, hable con el administrador!'
        });
    }

}

export {
    login
}