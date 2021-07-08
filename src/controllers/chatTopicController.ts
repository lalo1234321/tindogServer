import { Request, Response } from 'express';
import chatTopicmodel from '../mongoose-models/chatTopicModel';
const jwt = require('jsonwebtoken');

export const putTopic = (req:Request, res:Response) => {
    const token = req.headers.token;
    if (!token) {
        return res.status(400).json({
            message: "Token no introducido"
        });
    }
    jwt.verify(token, process.env.JWT_KEY, async (err, decoded) => {
        if (err) {
            return res.status(400).json({
                message: "Error validando el token"
            });
        }
        await chatTopicmodel.findOne({idComprador: decoded.uid, idVendedor:req.body.idVendedor},
            async (err, chat) => {
                if (err) {
                    return res.status(400).json({
                        message: "Error validando el chat"
                    });
                }
                if (chat) {
                    return res.status(400).json({
                        message: "Chat ya existente. Revisar su bandeja"
                    });
                }
                let chatTopic = {
                    idComprador: decoded.uid,
                    idVendedor: req.body.idVendedor,
                    topic: "Ventas"
                }
                await chatTopicmodel.create(chatTopic);
                res.status(200).json({
                    message: "Chat creado correctamente"
                });
            });
    });   
}

//validar que una mascota y comprador no tenga mas de un chat
export const getAllTopics = (req:Request, res:Response) => {
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
        chatTopicmodel.findOne({$or: [{idComprador: decoded.uid}, {idVendedor: decoded.uid}]},
            (err, chat) => {
                if (err) {
                    return res.status(400).json({
                        message: "Error desconocido obteniendo los chats"
                    });
                }
                res.status(200).json({
                    chats: chat
                });
            });
    });
}