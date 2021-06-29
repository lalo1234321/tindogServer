import { Request, Response } from 'express';
import IUser from '../interfaces/IUser';
import Sales from '../mongoose-models/SalesModel';
import User from '../mongoose-models/userModel';
import Pet from '../mongoose-models/petModel';
import { IPet } from '../interfaces/IPet';

const jwt = require('jsonwebtoken');

const registerSales = async (req: Request, res: Response) => {
    const token = req.headers.token;
    if (!token) {
        return res.status(400).json({
            message: "Token no introducido"
        });
    }
    try{
        const decoded = jwt.verify( token, process.env.JWT_KEY );
        const user:IUser = await User.findById((<any>decoded).uid);
        for (let index = 0; index < user.ownedPets.length; index++) {
            user.ownedPets[index] = await Pet.findById(user.ownedPets[index]);
        }
        let flag = false;
        let aux:IPet;
        for (let index = 0; index < user.ownedPets.length; index++) {
            aux = user.ownedPets[index];
            console.log(aux.username);
            if (req.body.username === aux.username.valueOf()) {
                flag = true;
                break;
            } 
        }
        if (flag == false) {
            return res.status(400).json({
                message: "Mascota no encontrada"
            });
        }
        let sale = {
            pet: aux._id,
            price: req.body.price,
            location: req.body.location,
            idSeller: user._id,
            date: new Date()
        }
        Sales.create(sale);
        return res.status(200).json({
            sale: sale,
            message: "Todo correcto"
        });
    } catch(er) {
        return res.status(400).json({
            message: "Algo salió mal"
        });
    }
}

export{
    registerSales
}