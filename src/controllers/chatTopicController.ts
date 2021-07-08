import { Request, Response } from 'express';
import chatTopicmodel from '../mongoose-models/chatTopic';
const jwt = require('jsonwebtoken');

export const putTopic = (req:Request, res:Response) => {
    const token = req.headers.token;
    if (!token) {
        return res.status(400).json({
            message: "Token no introducido"
        });
    }
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
            return res.status(400).json({
                message: "Error validando el token"
            });
        }
        let chatTopic = {
            idComprador: decoded.uid,
            idVendedor: req.body.idVendedor,
            usernameMascota: req.body.username,
            topic: "hola"
        }
        chatTopicmodel.create(chatTopic);
    });   
}

//validar que una mascota y comprador no tenga mas de un chat
export const getAllTopics = (req:Request, res:Response) => {
    req
}