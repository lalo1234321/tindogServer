import { IUser } from "../interfaces/IUser";
import { Request, Response } from 'express';
import User from '../mongoose-models/userModel';

const jwt= require('jsonwebtoken');

const confirmation = (req:Request, res:Response) => {
    
    let tok = req.params.token;
    jwt.verify( tok, process.env.JWT_KEY, async (err, decoded) => {
        if(err){
            console.error(err);
            return res.status(400).json({
                error: err
            });
        }
        const user:IUser = await User.findOneAndUpdate({_id: (<any>decoded).id},
            {emailConfirmed: true}, {new: true});
        return res.status(200).json({
            validToken: true,
        msg: "Correo confirmado",
        user: user
        });
    });
}

export{
    confirmation
}