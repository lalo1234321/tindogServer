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
                        message: "No se pudo enviar el correo"
                    });
                }
            }
        );
        res.status(200).json({
            message: "Usuario registrado con éxito \nVerifica tu correo!"            
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

export const updatePassword = async (req: Request, res: Response) => {
    let id = req.userId;
    let body = req.body;
    let password = body.password;
    password = bcrypt.hashSync(password, 5);
    body.password = password;
    try {
        if (body.password.length>0) {
            let userModify = await User.findByIdAndUpdate(id, {$set: {password: body.password}}, { new: true });
            return res.status(200).json({
                msg: "Contraseña modifcada con éxito."
            });
        } else {
            return res.status(500).json({
                msg: 'Esta vacia la contraseña, revise de nuevo.'
            });
        }
    } catch (err) {
        return res.status(500).json({
            msg: 'Ha ocurrido un error.'
        });
    }
}

export const updateState = async (req: Request, res: Response) => {  
    let id = req.userId;
    let body = req.body;
    try {
        if (body.state.length>0) {
            let userModify = await User.findByIdAndUpdate(id, {$set: {state: body.state}}, { new: true });
            return res.status(200).json({
                msg: "Estado de residencia modifcado con éxito."
            });
        } else {
            return res.status(500).json({
                msg: 'Esta vacío el estado de residencia, revise de nuevo.'
            });
        }
    } catch (err) {
        return res.status(500).json({
            msg: 'Ha ocurrido un error.'
        });
    }
}

export const updateTown = async (req: Request, res: Response) => {
    let id = req.userId;
    let body = req.body;
    try {
        if (body.town.length>0) {
            let userModify = await User.findByIdAndUpdate(id, {$set: {town: body.town}}, { new: true });
            return res.status(200).json({
                msg: "Municipio modifcado con éxito."
            });
        } else {
            return res.status(500).json({
                msg: 'Esta vacío el municipio, revise de nuevo.'
            });
        }
    } catch (err) {
        return res.status(500).json({
            msg: 'Ha ocurrido un error.'
        });
    }
}