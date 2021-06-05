import { Request, Response } from 'express';
const jwt = require('jsonwebtoken');
import { IUser } from "../interfaces/IUser";
import User from '../models/userModel'; 

const updateUser = async(req: Request, res: Response) => {
}

export{
    updateUser
}