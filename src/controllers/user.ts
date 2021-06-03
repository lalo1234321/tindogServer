import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import User from '../models/userModel';
const { sendEmail } = require('../utils/sendEmail');

const jwt = require('jsonwebtoken');

const register = async(req: Request, res: Response) => {
    console.log('dentro del método');
    let body = req.body;
    let password = body.password;
    password = bcrypt.hashSync(password,5);
    body.password = password;
    try{
        const user = new User(body);
        await user.save();
        jwt.sign( {id: user._id}, process.env.JWT_KEY, {expiresIn: '48h'},
            (err, token) => {
                if (err){
                    console.error(err);
                    return res.status(400).json({
                        error: err 
                    });
                }
                console.log(`token: ${token}`);
                try{
                    sendEmail(req.body.email, token);
                }catch(err){
                    console.error(err);
                    return res.status(500).json({
                        msg: err
                    });
                }
            }
        );
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
