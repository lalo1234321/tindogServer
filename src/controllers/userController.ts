import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import User from '../mongoose-models/userModel';
import Pet from "../mongoose-models/petModel";
import { KindOfImage } from '../interfaces/IFile';
const { sendEmail } = require('../utils/sendEmail');
import { IUser } from "../interfaces/IUser";

const jwt = require('jsonwebtoken');

export const registerUser = async (req: Request, res: Response) => {
    let body = req.body;
    let userName = body.userName;
    let email = body.email;
    let password = body.password;
    password = bcrypt.hashSync(password, 5);
    body.password = password;
    try {
        const userNameResult = await User.find({ userName: userName });
        if (userNameResult.length == 0) {
            const emailResult = await User.find({ email: email });
            if (emailResult.length == 0) {
                if (body.age >= 18) {
                    const user = new User(body);
                    await user.save();
                    jwt.sign({ id: user._id }, process.env.JWT_KEY, { expiresIn: '48h' },
                        (err, token) => {
                            if (err) {
                                return res.status(400).json({
                                    message: err
                                });
                            }
                            console.log(`token: ${token}`);
                            try {
                                sendEmail(req.body.email, token);
                            } catch (err) {
                                return res.status(500).json({
                                    message: err
                                });
                            }
                        }
                    );
                    res.status(200).json({
                        message: "Usuario guardado correctamente"
                    });
                } else {
                    return res.status(400).json({
                        message: "Edad menor a 18"
                    });
                }
            } else {
                return res.status(404).json({
                    message: "Email de usuario existente"
                });
            }
        } else {
            return res.status(404).json({
                message: "Nombre de usuario existente"
            });
        }
    } catch (err) {
        res.status(500).json({
            message: err
        });
    }
}

export const getAllPetsOwnedByUser = async (req: Request, res: Response) => {
    // let query = User.find({ _id: req.userId }).populate('ownedPets')
    // query.select('ownedPets').exec((err, userDoc) => {
    //     if (err)
    //         return res.status(404).json({
    //             message: err
    //         })
    //     res.json(
    //         userDoc
    //     )
    // })

    await Pet.find({ owner: req.userId, isDeleted: false }, (err, petDoc) => {
        if (err) {
            return res.status(404).json({
                message: err
            });
        } else {
            return res.status(200).json([{
                ownedPets: petDoc
            }]);
        }
    });
}

export const getInformationConnection = async (req: Request, res: Response) => {
    let id = req.userId;
    const user: IUser = await User.findById(id);
    if (!user) {
        return res.status(400).json({
            message: "El usuario no existe",
            userId: id
        });
    } else {
        if (user.auxLastConnection == null && user.auxLastConnection == null) {
            return res.status(400).json({
                message: "Es la primera vez que inicias sesión por lo cúal aún no hay ningún registro"
            });
        } else {
            if (user.deviceInformation == null || user.auxLastConnection == null) {
                return res.status(400).json({
                    message: "Sin datos de sesión"
                });
            } else {
                return res.status(200).json({
                    message: "Última sesión iniciada el: " + user.auxLastConnection.toISOString().substring(0, 10) + " "
                        + user.auxLastConnection.toString().substring(16, 70) + " desde " + user.deviceInformation
                });
            }
        }
    }
}

export const savingSessionData = async (req: Request, res: Response) => {
    let id = req.userId;
    let body = req.body;
    try {
        const user: IUser = await User.findById(id);
        if (!user) {
            return res.status(400).json({
                message: "El usuario no existe",
                userId: id
            });
        } else {
            if (body.deviceInformation.length > 0) {
                let userModify = await User.findByIdAndUpdate(id, { $set: { deviceInformation: body.deviceInformation, auxLastConnection: new Date() } }, { new: true });
                return res.status(200).json({
                    message: "Datos de sesión aguardados con éxito"
                });
            } else {
                return res.status(404).json({
                    message: "Esta vacia la información del dispositivo, revise de nuevo"
                });
            }
        }
    } catch (err) {
        return res.status(500).json({
            message: "Ha ocurrido un error"
        });
    }
}

export const updatePassword = async (req: Request, res: Response) => {
    let id = req.userId;
    let body = req.body;
    let password = body.password;
    password = bcrypt.hashSync(password, 5);
    body.password = password;
    try {
        if (body.password.length > 0) {
            let userModify = await User.findByIdAndUpdate(id, { $set: { password: body.password } }, { new: true });
            return res.status(200).json({
                message: "Contraseña modifcada con éxito"
            });
        } else {
            return res.status(500).json({
                message: "Esta vacia la contraseña, revise de nuevo"
            });
        }
    } catch (err) {
        return res.status(500).json({
            message: "Ha ocurrido un error"
        });
    }
}

export const updateState = async (req: Request, res: Response) => {
    let id = req.userId;
    let body = req.body;
    try {
        if (body.state.length > 0) {
            let userModify = await User.findByIdAndUpdate(id, { $set: { state: body.state } }, { new: true });
            return res.status(200).json({
                message: "Estado de residencia modifcado con éxito"
            });
        } else {
            return res.status(500).json({
                message: "Esta vacío el estado de residencia, revise de nuevo"
            });
        }
    } catch (err) {
        return res.status(500).json({
            message: "Ha ocurrido un error"
        });
    }
}

export const updateTown = async (req: Request, res: Response) => {
    let id = req.userId;
    let body = req.body;
    try {
        if (body.town.length > 0) {
            let userModify = await User.findByIdAndUpdate(id, { $set: { town: body.town } }, { new: true });
            return res.status(200).json({
                message: "Municipio modifcado con éxito"
            });
        } else {
            return res.status(500).json({
                message: "Esta vacío el municipio, revise de nuevo"
            });
        }
    } catch (err) {
        return res.status(500).json({
            message: "Ha ocurrido un error"
        });
    }
}