import { IPet } from "../interfaces/IPet";
import { IUser } from "../interfaces/IUser";
import { Request, Response } from 'express';
import Pet from '../mongoose-models/petModel';
import User from '../mongoose-models/userModel';
const jwt = require('jsonwebtoken');

const match = async (req:Request, res:Response) => {
    const id = req.params.id;
    const token = req.headers.token;
    const decoded = jwt.verify( token, process.env.JWT_KEY );
    const user:IUser = await User.findById((<any>decoded).uid);
    if(!token){
        return res.status(400).json({
            message: "Token no introducido"
        });
    }
    try{
        const pet:IPet = await Pet.findById(id);
        //const pet:IPet = await Pet.findOne({_id: (<any>decoded).id});
        //mascota encontrada
        // $gte: aux, $lte: aux1
        let aux = pet.age - 4;
        let aux1 = pet.age + 4;
        console.log('antes del array');
        
        let possibleMatch =  await Pet.find({specie: pet.specie, age: {$gte: aux, $lte: aux1},
            gender: {$ne: pet.gender}, isDeleted: false, owner: {$ne: pet.owner}});
        return res.status(200).json({
            validToken: true,
            message: "Mascotas seleccionadas correctamente",
            match: possibleMatch
        });
    }catch(err){
        return res.status(500).json({
            message: 'Error encontrando mascotas',
            token: token,
            user: user
        });
    }
}

export{
    match
}