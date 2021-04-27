import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import User from '../models/userModel';

const register = async(req: Request, res: Response) => {
    console.log('dentro del método');
    let body = req.body;
    let password = body.password;
    password = bcrypt.hashSync(password,5);
    body.password = password;
    try{
        const user = new User(body);
        await user.save();
        res.status(200).json({
            msg: "usuario guardado"            
        });
    } catch(err) {
        res.status(500).json({
            err
        });
    }
};


export {
    register
}
