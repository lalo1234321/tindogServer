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
                message: "Es la primera vez que inicias sesi??n por lo c??al a??n no hay ning??n registro"
            });
        } else {
            if (user.deviceInformation == null || user.auxLastConnection == null) {
                return res.status(400).json({
                    message: "Sin datos de sesi??n"
                });
            } else {
                return res.status(200).json({
                    message: "??ltima sesi??n iniciada el: " + user.auxLastConnection.toISOString().substring(0, 10) + " a las "
                        + user.auxLastConnection.toString().substring(16, 33) + " desde " + user.deviceInformation
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
                    message: "Datos de sesi??n aguardados con ??xito"
                });
            } else {
                return res.status(404).json({
                    message: "Esta vacia la informaci??n del dispositivo, revise de nuevo"
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
                message: "Contrase??a modifcada con ??xito"
            });
        } else {
            return res.status(500).json({
                message: "Esta vacia la contrase??a, revise de nuevo"
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
                message: "Estado de residencia modifcado con ??xito"
            });
        } else {
            return res.status(500).json({
                message: "Esta vac??o el estado de residencia, revise de nuevo"
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
                message: "Municipio modifcado con ??xito"
            });
        } else {
            return res.status(500).json({
                message: "Esta vac??o el municipio, revise de nuevo"
            });
        }
    } catch (err) {
        return res.status(500).json({
            message: "Ha ocurrido un error"
        });
    }
}

export const degrade = async (req: Request, res: Response) => {
    let id = req.userId;
    try {
        const user: IUser = await User.findById(id);
        let date = new Date();
        let dateW = new Date(date.getFullYear(), date.getMonth(), date.getDay() + 7);
        console.log('datePlan[1] ' + user.datePlan[1].toISOString().substring(0, 10));
        console.log('dateW ' + dateW.toISOString().substring(0, 10));
        console.log('date ' + date.toISOString().substring(0, 10));
        if (user.datePlan[1].toISOString().substring(0, 10) <= dateW.toISOString().substring(0, 10)) {
            if (user.datePlan[1].toISOString().substring(0, 10) == date.toISOString().substring(0, 10)) {
                user.premium = false;
                return res.status(200).json({
                    message: "Tu plan expiro, ya no eres premium"
                });
            } else {
                return res.status(200).json({
                    message: "Tu plan esta por expirar"
                });
            }
        }
    } catch (err) {
        return res.status(500).json({
            message: "Ha ocurrido un error"
        });
    }
}

export const getID = (req:Request, res:Response) => {
    const token = req.headers.token;
    if (!token) {
        return res.status(400).json({
            message: "Token no introducido"
        });
    }
    const decoded = jwt.verify( token, process.env.JWT_KEY );
    return res.status(200).json({
        id: decoded.uid
    });
}