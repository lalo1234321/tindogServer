import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import User from '../mongoose-models/userModel';
import Pet from "../mongoose-models/petModel";
import { KindOfImage } from '../interfaces/IFile';
const { sendEmail } = require('../utils/sendEmail');

const jwt = require('jsonwebtoken');

export const registerUser = async(req: Request, res: Response) => {
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
                    return res.status(400).json({
                        message: err 
                    });
                }
                console.log(`token: ${token}`);
                try{
                    sendEmail(req.body.email, token);
                }catch(err){
                    return res.status(500).json({
                        message: err
                    });
                }
            }
        );
        res.status(200).json({
            message: "Usuario guardado correctamente"            
        });
    } catch(err) {
        res.status(500).json({
            message: err
        });
    }
}
export const getAllPetsOwnedByUser = (req: Request, res: Response) => {
    let query = User.find({_id: req.userId}).populate('ownedPets')
       
    query.select('ownedPets').exec((err, userDoc) => { 
        if(err)
            return res.status(404).json({
                message: err
            })
        res.json(
            userDoc
        )
    })
};