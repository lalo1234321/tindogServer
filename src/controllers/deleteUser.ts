import { Request, Response } from 'express';
const jwt = require('jsonwebtoken');
import { IUser } from "../interfaces/IUser";
import User from '../models/userModel'; 

const deleteUser = async(req: Request, res: Response) => {
    const token = req.headers.token;
    if (!token) {
        return res.status(400).json({
            msg: "Token no introducido"
        });
    }
    try{
        const prueba = jwt.verify( token, process.env.JWT_KEY );
        const user:IUser = await User.findOneAndUpdate({_id: (<any>prueba).uid},
            {isDeleted: true}, {new: true});
        return res.status(200).json({
            validToken: true,
            msg: "Usuario eliminado",
            user: user
        });
    }catch(err){
        return res.status(500).json({
            msg: 'Ha ocurrido un error validando el token',
            token: token
        });
    }
}

export{
    deleteUser
}