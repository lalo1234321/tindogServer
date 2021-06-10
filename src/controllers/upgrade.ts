import { IUser } from "../interfaces/IUser";
import { Request, Response } from 'express';
import User from '../mongoose-models/userModel';

const jwt = require('jsonwebtoken');

const upgrade1 = async (req:Request, res:Response) => {
    const token = req.headers.token;
    const typePlan = req.body.typePlan;
    if (!token) {
        return res.status(400).json({
            message: "Token no introducido"
        });
    }
    try{
        const prueba = jwt.verify( token, process.env.JWT_KEY );
        const user:IUser = await User.findOne({_id: (<any>prueba).uid});
        if (!user.premium) {
            //tipo mensual
            if(typePlan === 1){
                user.premium = true;
                let date = new Date();
                user.datePlan[0] = date;
                user.datePlan[1] = new Date(date.getFullYear(),
                    date.getMonth(), date.getDay()+30);
                await User.findOneAndUpdate({_id: user._id}, user, {new: true});
                return res.status(200).json({
                    validToken: true,
                    message: "Mejora completada satisfactoriamente",
                    user: user
                });
            }
            //tipo anual
            if(typePlan === 2){
                user.premium = true;
                let date = new Date();
                user.datePlan[0] = date;
                user.datePlan[1] = new Date(date.getFullYear(),
                    date.getMonth(), date.getDay()+365);
                await User.findOneAndUpdate({_id: user._id}, user, {new: true})
                return res.status(200).json({
                    validToken: true,
                    message: "Mejora completada satisfactoriamente",
                    user: user
                });
            }
            return res.status(400).json({
                message: "Opción no válida"
            });
        }
        if (typePlan === 1) {
            let date:Date = user.datePlan[1];
            user.datePlan[1] = new Date(date.getFullYear()
            , date.getMonth(), date.getDay()+30);
            await User.findOneAndUpdate({_id: user.id}, user, {new: true});
            return res.status(200).json({
                validToken: true,
                message: "Mejora completada satisfactoriamente",
                user: user
            });
        }
        if (typePlan === 2) {
            let date:Date = user.datePlan[1];
            user.datePlan[1] = new Date(date.getFullYear(), 
                date.getMonth(), date.getDay()+365);
            await User.findOneAndUpdate({_id: user.id}, user, {new: true});
            return res.status(200).json({
                validToken: true,
                message: "Mejora completada satisfactoriamente",
                user: user
            });
        }
        return res.status(400).json({
            message: "Opción no válida"
        });
    }catch(err){
        return res.status(500).json({
            message: 'Ha ocurrido un error validando el token',
            token: token
        });
    }

}
export{
    upgrade1
}